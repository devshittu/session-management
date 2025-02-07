import { prisma } from '@/lib/prisma';
import SessionForm from '../../../features/Sessions/ui/SessionForm';

type Admission = {
  id: number;
  serviceUser: { id: number; name: string };
};

type Activity = {
  id: number;
  name: string;
};

export default async function NewSessionPage() {
  const [admissions, activities]: [Admission[], Activity[]] = await Promise.all(
    [
      prisma.admission.findMany({
        where: { dischargeDate: null }, // Fetch only active admissions
        include: { serviceUser: true },
      }),
      prisma.activity.findMany(),
    ],
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Start New Session</h1>
      <SessionForm admissions={admissions} activities={activities} />
    </div>
  );
}

// src/app/sessions/new/page.tsx
