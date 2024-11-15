// app/api/serviceUsers/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ServiceUserStatus } from '@/types/serviceUser';

type CreateserviceUserBody = {
  name: string;
  wardId: number;
  status?: ServiceUserStatus;
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const status = url.searchParams.get('status') as
    | ServiceUserStatus
    | undefined;

  const where = status ? { status } : {};

  const serviceUsers = await prisma.serviceUser.findMany({
    where,
    include: {
      ward: true,
      sessions: true,
    },
  });

  const serializedserviceUsers = serviceUsers.map((serviceUser) => ({
    ...serviceUser,
    createdAt: serviceUser.createdAt
      ? serviceUser.createdAt.toISOString()
      : null,
    updatedAt: serviceUser.updatedAt
      ? serviceUser.updatedAt.toISOString()
      : null,
  }));

  return NextResponse.json(serializedserviceUsers);
}

export async function POST(request: Request) {
  const body: CreateserviceUserBody = await request.json();
  const { name, wardId, status } = body;

  if (!name || !wardId) {
    return NextResponse.json(
      { error: 'Name and wardId are required.' },
      { status: 400 },
    );
  }

  if (status && !['admitted', 'discharged'].includes(status)) {
    return NextResponse.json(
      { error: 'Invalid status value.' },
      { status: 400 },
    );
  }

  try {
    const newserviceUser = await prisma.serviceUser.create({
      data: {
        name,
        wardId,
        status: status || 'admitted',
      },
      include: {
        ward: true,
        sessions: true,
      },
    });

    const serializedserviceUser = {
      ...newserviceUser,
      createdAt: newserviceUser.createdAt.toISOString(),
      updatedAt: newserviceUser.updatedAt
        ? newserviceUser.updatedAt.toISOString()
        : null,
    };

    return NextResponse.json(serializedserviceUser, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to create serviceUser.' },
      { status: 500 },
    );
  }
}
