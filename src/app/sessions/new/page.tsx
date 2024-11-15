// app/sessions/new/page.tsx
import { prisma } from '@/lib/prisma';
import SessionForm from './SessionForm';

type ServiceUser = {
  id: number;
  name: string;
};

type Activity = {
  id: number;
  name: string;
};

export default async function NewSessionPage() {
  const [serviceUsers, activities]: [ServiceUser[], Activity[]] =
    await Promise.all([
      prisma.serviceUser.findMany(),
      prisma.activity.findMany(),
    ]);

  return (
    <div>
      <h1>Start New Session</h1>
      <SessionForm serviceUsers={serviceUsers} activities={activities} />
    </div>
  );
}
