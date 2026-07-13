import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function generateResponse(req: NextRequest) {
  try {
    const url = new URL(req.url);
    let fullPath = url.pathname.replace('/api/test/serve', ''); 
    
    if (!fullPath.startsWith('/')) {
      fullPath = '/' + fullPath;
    }

    const method = req.method.toUpperCase();

    // 1. Fetch all configured mock endpoints for this specific HTTP method
    const configuredEndpoints = await prisma.endpoint.findMany({
      where: { method }
    });

    // Split the incoming request path into segment chunks (e.g., ['v1', 'products', '101'])
    const incomingSegments = fullPath.split('/').filter(seg => seg.length > 0);

    let matchedRule = null;
    let extractedParams: Record<string, string> = {};

    // 2. Loop through routes to evaluate segment structures token-by-token
    for (const rule of configuredEndpoints) {
      const storedSegments = rule.path.split('/').filter(seg => seg.length > 0);

      // If lengths differ, this structural pattern is a misfit
      if (storedSegments.length !== incomingSegments.length) continue;

      let isMatch = true;
      let tempParams: Record<string, string> = {};

      for (let i = 0; i < storedSegments.length; i++) {
        // Look for the variable signature symbol ':' (e.g., ':id')
        if (storedSegments[i].startsWith(':')) {
          const paramName = storedSegments[i].slice(1);
          tempParams[paramName] = incomingSegments[i];
        } 
        // Static segments must match exactly
        else if (storedSegments[i] !== incomingSegments[i]) {
          isMatch = false;
          break;
        }
      }

      if (isMatch) {
        matchedRule = rule;
        extractedParams = tempParams;
        break; // Match confirmed! Stop evaluation loop.
      }
    }

    // 3. Clear developer error block if no structural match exists
    if (!matchedRule) {
      return NextResponse.json(
        {
          error: "Mockforge Routing Exception",
          message: `No static or dynamic mock rule layout matches ${method} '${fullPath}'`,
        },
        { status: 404 }
      );
    }

    // 4. Safely parse the response payload body structure
    let responseData;
    try {
      responseData = typeof matchedRule.responseBody === 'string' 
        ? JSON.parse(matchedRule.responseBody) 
        : matchedRule.responseBody;
    } catch (e) {
      responseData = { message: matchedRule.responseBody };
    }

    // ADVANCED: If the payload contains dynamic keys matching our path parameters, 
    // we can swap them out or just return the static mock body payload template!
    
    return new NextResponse(JSON.stringify(responseData), {
      status: matchedRule.statusCode || 200,
      headers: { 
        'Content-Type': 'application/json',
        'X-Mockforge-Params': JSON.stringify(extractedParams) // Injects parsed params into response headers!
      },
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Mockforge Engine Error", details: error.message }, 
      { status: 500 }
    );
  }
}

export { 
  generateResponse as GET, 
  generateResponse as POST, 
  generateResponse as PUT, 
  generateResponse as DELETE, 
  generateResponse as PATCH 
};