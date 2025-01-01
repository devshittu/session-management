import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '20', 10);
  const skip = (page - 1) * pageSize;

  const sortBy = searchParams.get('sortBy') || 'timeIn'; // default sort
  const order = searchParams.get('order') || 'asc'; // default order
  const groupBy = searchParams.get('groupBy'); // e.g., 'activityId'

  // Define allowed sortBy options and map them to Prisma orderBy
  const allowedSortBy = ['timeIn', 'activityName', 'serviceUserName'];
  if (!allowedSortBy.includes(sortBy)) {
    return NextResponse.json(
      { error: 'Invalid sortBy parameter' },
      { status: 400 },
    );
  }

  // Map sortBy to Prisma orderBy
  let orderBy: any = {};
  switch (sortBy) {
    case 'timeIn':
      orderBy = { timeIn: order };
      break;
    case 'activityName':
      orderBy = {
        activity: {
          name: order,
        },
      };
      break;
    case 'serviceUserName':
      orderBy = {
        admission: {
          serviceUser: {
            name: order,
          },
        },
      };
      break;
    default:
      orderBy = { timeIn: order }; // fallback
      break;
  }

  try {
    if (groupBy) {
      // Implement groupBy logic if needed
      const groupedSessions = await prisma.session.groupBy({
        by: [groupBy],
        _count: { _all: true },
        orderBy: { [groupBy]: order },
      });
      return NextResponse.json(groupedSessions);
    }

    const [sessions, total] = await Promise.all([
      prisma.session.findMany({
        skip,
        take: pageSize,
        orderBy: orderBy,
        include: {
          admission: {
            include: {
              serviceUser: true,
              ward: true,
            },
          },
          activity: true,
        },
      }),
      prisma.session.count(),
    ]);

    const serializedSessions = sessions.map((session) => ({
      id: session.id,
      admission: {
        id: session.admission.id,
        serviceUser: {
          id: session.admission.serviceUser.id,
          name: session.admission.serviceUser.name,
        },
        ward: {
          id: session.admission.ward.id,
          name: session.admission.ward.name,
        },
        startDate: session.admission.admissionDate.toISOString(),
        endDate: session.admission.dischargeDate
          ? session.admission.dischargeDate.toISOString()
          : null,
      },
      activity: {
        id: session.activity.id,
        name: session.activity.name,
      },
      timeIn: session.timeIn.toISOString(),
      timeOut: session.timeOut ? session.timeOut.toISOString() : null,
    }));

    return NextResponse.json({
      sessions: serializedSessions,
      total,
      page,
      pageSize,
    });
  } catch (error) {
    console.error('Failed to fetch sessions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const data = await request.json();
  const { admissionId, activityId } = data;

  if (!admissionId || !activityId) {
    return NextResponse.json(
      { error: 'Missing admissionId or activityId' },
      { status: 400 },
    );
  }

  try {
    // Ensure the admission exists and is active
    const admission = await prisma.admission.findUnique({
      where: { id: admissionId },
      include: { serviceUser: true },
    });

    if (!admission || admission.dischargeDate) {
      return NextResponse.json(
        { error: 'Invalid or inactive admission' },
        { status: 400 },
      );
    }

    // Create the session
    const session = await prisma.session.create({
      data: {
        admissionId,
        activityId,
        timeIn: new Date(),
      },
      include: {
        admission: {
          include: {
            serviceUser: true,
          },
        },
        activity: true,
      },
    });

    return NextResponse.json(session, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 },
    );
  }
}

// Additional methods (PUT, DELETE) can be added as needed
// src/app/api/sessions/route.ts
