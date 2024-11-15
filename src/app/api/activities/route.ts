// src/app/api/activities/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Activities endpoint' });
}
