import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ServiceUserStatus } from '@/types/serviceUser';

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
      admissions: {
        include: {
          sessions: true,
        },
      },
    },
  });

  if (!serviceUser) {
    return NextResponse.json(
      { error: 'ServiceUser not found.' },
      { status: 404 },
    );
  }

  const serializedserviceUser = {
    ...serviceUser,
    createdAt: serviceUser.createdAt.toISOString(),
    updatedAt: serviceUser.updatedAt?.toISOString() || null,
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

  const body = await request.json();
  const { name, wardId } = body;

  try {
    const updatedserviceUser = await prisma.serviceUser.update({
      where: { id: serviceUserId },
      data: { name, wardId },
      include: { ward: true },
    });

    const serializedserviceUser = {
      ...updatedserviceUser,
      createdAt: updatedserviceUser.createdAt.toISOString(),
      updatedAt: updatedserviceUser.updatedAt?.toISOString() || null,
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
      { message: 'ServiceUser deleted successfully.' },
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

// src/app/api/serviceUsers/[id]/route.ts
