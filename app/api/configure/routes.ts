import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { path, method, statusCode, responseBody, projectId } = body;

    // 1. Structural integrity verification check blocks
    if (!path || !method || !responseBody || !projectId) {
      return NextResponse.json(
        { error: "Validation Failure", message: "Missing tracking keys: path, method, responseBody, or projectId" },
        { status: 400 }
      );
    }

    let formattedPath = path.trim();
    if (!formattedPath.startsWith('/')) {
      formattedPath = '/' + formattedPath;
    }

    // 2. Query check to evaluate if a matching endpoint record exists
    const existingEndpoint = await prisma.endpoint.findFirst({
      where: {
        path: formattedPath,
        method: method.toUpperCase(),
      }
    });

    let result;
    const processedPayload = typeof responseBody === 'object' 
      ? JSON.stringify(responseBody) 
      : responseBody;

    if (existingEndpoint) {
      // If the pathway combination exists, perform a clean row update sync
      result = await prisma.endpoint.update({
        where: { id: existingEndpoint.id },
        data: {
          statusCode: statusCode ? parseInt(statusCode) : 200,
          responseBody: processedPayload
        }
      });
    } else {
      // Otherwise, commit a new row entry instance to the PostgreSQL engine map
      result = await prisma.endpoint.create({
        data: {
          path: formattedPath,
          method: method.toUpperCase(),
          statusCode: statusCode ? parseInt(statusCode) : 200,
          responseBody: processedPayload,
          projectId: projectId
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: `Mock rule mapping configurations deployed successfully!`,
      data: result
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json(
      { error: "Configuration Blueprint Storage Misfire", details: error.message },
      { status: 500 }
    );
  }
}