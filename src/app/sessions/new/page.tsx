// app/sessions/new/page.tsx
import { prisma } from '@/lib/prisma';
import SessionForm from './SessionForm';

type Patient = {
  id: number;
  name: string;
};

type Activity = {
  id: number;
  name: string;
};

export default async function NewSessionPage() {
  const [patients, activities]: [Patient[], Activity[]] = await Promise.all([
    prisma.patient.findMany(),
    prisma.activity.findMany(),
  ]);

  return (
    <div>
      <h1>Start New Session</h1>
      <SessionForm patients={patients} activities={activities} />
    </div>
  );
}
