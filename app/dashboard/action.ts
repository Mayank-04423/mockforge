'use server';

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

interface CreateMockInput {
  method: string;
  path: string;
  statusCode: number;
  delay: number;
  responseBody: string; // ⚡ Added tracker field
}

export async function createMockEndpoint(data: CreateMockInput) {
  try {
    // Basic formatting to ensure paths always start with a clean forward slash
    const formattedPath = data.path.startsWith('/') ? data.path : `/${data.path}`;

    // Write directly into your Prisma PostgreSQL instance
    const newEndpoint = await db.endpoint.create({
  data: {
    method: data.method,
    path: formattedPath,
    statusCode: data.statusCode,
    delay: data.delay,
    responseBody: data.responseBody || "{}", // ⚡ Passes JSON fallback string
    projectId: "default-project-id",        // ⚡ Temporary hardcoded ID placeholder
  },
});
    

    // Refresh the dashboard data instantly without a full page reload
    revalidatePath('/dashboard');
    
    return { success: true, data: newEndpoint };
  } catch (error) {
    console.error("Database Write Error:", error);
    return { success: false, error: "Failed to save endpoint configuration." };
  }
}