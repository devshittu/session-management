// app/api/serviceUsers/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ServiceUserStatus } from '@/types/serviceUser';

type UpdateserviceUserBody = {
  name?: string;
  wardId?: number;
  status?: ServiceUserStatus;
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const serviceUserId = parseInt(params.id);

  if (isNaN(serviceUserId)) {
    return NextResponse.json(
      { error: 'Invalid serviceUser ID.' },
      { status: 400 },
    );
  }

  const serviceUser = await prisma.serviceUser.findUnique({
    where: { id: serviceUserId },
    include: {
      ward: true,
      sessions: true,
    },
  });

  if (!serviceUser) {
    return NextResponse.json(
      { error: 'serviceUser not found.' },
      { status: 404 },
    );
  }

  const serializedserviceUser = {
    ...serviceUser,
    createdAt: serviceUser.createdAt.toISOString(),
    updatedAt: serviceUser.updatedAt
      ? serviceUser.updatedAt.toISOString()
      : null,
  };

  return NextResponse.json(serializedserviceUser);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const serviceUserId = parseInt(params.id);

  if (isNaN(serviceUserId)) {
    return NextResponse.json(
      { error: 'Invalid serviceUser ID.' },
      { status: 400 },
    );
  }

  const body: UpdateserviceUserBody = await request.json();
  const { name, wardId, status } = body;

  if (status && !['admitted', 'discharged'].includes(status)) {
    return NextResponse.json(
      { error: 'Invalid status value.' },
      { status: 400 },
    );
  }

  try {
    const updatedserviceUser = await prisma.serviceUser.update({
      where: { id: serviceUserId },
      data: {
        name,
        wardId,
        status,
      },
      include: {
        ward: true,
        sessions: true,
      },
    });

    const serializedserviceUser = {
      ...updatedserviceUser,
      createdAt: updatedserviceUser.createdAt.toISOString(),
      updatedAt: updatedserviceUser.updatedAt
        ? updatedserviceUser.updatedAt.toISOString()
        : null,
    };

    return NextResponse.json(serializedserviceUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to update serviceUser.' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const serviceUserId = parseInt(params.id);

  if (isNaN(serviceUserId)) {
    return NextResponse.json(
      { error: 'Invalid serviceUser ID.' },
      { status: 400 },
    );
  }

  try {
    await prisma.serviceUser.delete({
      where: { id: serviceUserId },
    });
    return NextResponse.json(
      { message: 'serviceUser deleted successfully.' },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to delete serviceUser.' },
      { status: 500 },
    );
  }
}
