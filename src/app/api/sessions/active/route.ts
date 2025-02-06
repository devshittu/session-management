import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    // Fetch sessions that are still active (timeOut is null)
    const sessions = await prisma.session.findMany({
      where: { timeOut: null },
      orderBy: { timeIn: 'desc' },
      include: {
        admission: {
          include: {
            serviceUser: true,
            ward: true,
          },
        },
        activity: true,
      },
    });

    const serializedSessions = sessions.map((session) => ({
      ...session,
      timeIn: session.timeIn.toISOString(),
      timeOut: session.timeOut ? session.timeOut.toISOString() : null,
      admission: {
        ...session.admission,
        admissionDate: session.admission.admissionDate.toISOString(),
        dischargeDate: session.admission.dischargeDate
          ? session.admission.dischargeDate.toISOString()
          : null,
      },
    }));

    return NextResponse.json({ sessions: serializedSessions });
  } catch (error) {
    console.error('Failed to fetch active sessions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch active sessions' },
      { status: 500 },
    );
  }
}
