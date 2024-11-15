// app/sessions/SessionsList.tsx
'use client';

import { useRouter } from 'next/navigation';
import ElapsedTime from './ElapsedTime';

type Session = {
  id: number;
  serviceUser: { name: string };
  activity: { name: string };
  timeIn: string;
  timeOut?: string | null;
};

type Props = {
  sessions: Session[];
};

const SessionsList = ({ sessions }: Props) => {
  const router = useRouter();

  const handleEndSession = async (sessionId: number) => {
    const response = await fetch(`/api/sessions/${sessionId}/end`, {
      method: 'POST',
    });
    if (response.ok) {
      router.refresh();
    } else {
      alert('Failed to end session');
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">
              ServiceUser
            </th>
            <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">
              Activity
            </th>
            <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">
              Time In
            </th>
            <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">
              Time Out
            </th>
            <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">
              Elapsed Time
            </th>
            <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {sessions.map((session) => (
            <tr key={session.id} className="border-b hover:bg-gray-100">
              <td className="py-3 px-4">{session.serviceUser.name}</td>
              <td className="py-3 px-4">{session.activity.name}</td>
              <td className="py-3 px-4">
                {new Date(session.timeIn).toLocaleString()}
              </td>
              <td className="py-3 px-4">
                {session.timeOut
                  ? new Date(session.timeOut).toLocaleString()
                  : 'In Progress'}
              </td>
              <td className="py-3 px-4">
                <ElapsedTime
                  timeIn={session.timeIn}
                  timeOut={session.timeOut}
                />
              </td>
              <td className="py-3 px-4">
                {!session.timeOut && (
                  <button
                    onClick={() => handleEndSession(session.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    End Session
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SessionsList;
