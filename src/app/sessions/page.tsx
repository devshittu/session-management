// app/sessions/page.tsx
import { prisma } from '@/lib/prisma';
import SessionsList from './SessionsList';

type Session = {
  id: number;
  serviceUser: { name: string };
  activity: { name: string };
  timeIn: string;
  timeOut?: string | null;
};
export default async function SessionsPage() {
  const sessions = await prisma.session.findMany({
    include: {
      serviceUser: true,
      activity: true,
    },
  });

  const serializedSessions: Session[] = sessions.map((session) => ({
    id: session.id,
    serviceUser: { name: session.serviceUser.name },
    activity: { name: session.activity.name },
    timeIn: session.timeIn.toISOString(),
    timeOut: session.timeOut ? session.timeOut.toISOString() : null,
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sessions</h1>
      <a
        href="/sessions/new"
        className="mb-4 inline-block text-blue-500 hover:underline"
      >
        Start New Session
      </a>
      <SessionsList sessions={serializedSessions} />
    </div>
  );
}
