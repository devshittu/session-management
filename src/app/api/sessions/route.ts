// app/api/sessions/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const sessions = await prisma.session.findMany({
    include: {
      patient: true,
      activity: true,
    },
  });
  return NextResponse.json(sessions);
}

export async function POST(request: Request) {
  const data = await request.json();
  const { patientId, activityId } = data;

  if (!patientId || !activityId) {
    return NextResponse.json(
      { error: 'Missing patientId or activityId' },
      { status: 400 },
    );
  }

  try {
    const session = await prisma.session.create({
      data: {
        patientId,
        activityId,
        timeIn: new Date(),
      },
    });
    return NextResponse.json(session);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 },
    );
  }
}

// Additional methods (PUT, DELETE) can be added as needed
