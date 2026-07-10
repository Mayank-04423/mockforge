import { NextResponse } from 'next/server';
import prisma from '@/lib/db'; // Pipes right through our clean db.ts vault manager!

export async function GET() {
  try {
    // 1. Tell Prisma to write a fresh record directly into your local database
    const newProject = await prisma.project.create({
      data: {
        name: "4 AM Database Victory",
        description: "Successfully configured Prisma 7 client schema mappings",
      }
    });

    // 2. Fetch the collection right back out to verify it stuck permanently
    const allProjects = await prisma.project.findMany();

    return NextResponse.json({
      success: true,
      message: "MockForge Backend Pipeline Is Alive!",
      createdRecord: newProject,
      totalProjectsStored: allProjects.length
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}