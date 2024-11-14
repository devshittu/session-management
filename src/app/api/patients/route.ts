// app/api/patients/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const patients = await prisma.patient.findMany({
    include: {
      ward: true,
    },
  });
  return NextResponse.json(patients);
}

// Additional methods (POST, PUT, DELETE) can be added as needed
// src/app/api/patients/route.ts
