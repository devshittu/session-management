'use client';

import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import ElapsedTime from './ElapsedTime';
import { useActiveSessions } from '../hooks/useActiveSessions';

const ActiveSessionsDashboard: React.FC = () => {
  const { data, isLoading, isError, error } = useActiveSessions();
  const queryClient = useQueryClient();
  const router = useRouter();

  const endSessionMutation = useMutation({
    mutationFn: async (sessionId: number) => {
      const response = await fetch(`/api/sessions/${sessionId}/end`, {
        method: 'POST',
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to end session');
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success('Session ended successfully!');
      queryClient.invalidateQueries({ queryKey: ['activeSessions'] });
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to end session');
    },
  });

  if (isLoading)
    return <p className="text-center">Loading active sessions...</p>;
  if (isError)
    return <p className="text-center text-error">Error: {error?.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Active Sessions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data?.sessions.map((session) => (
          <div key={session.id} className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-xl">
                {session.admission.serviceUser.name}
              </h2>
              <p className="text-sm">
                <strong>Activity:</strong> {session.activity.name}
              </p>
              <p className="text-sm">
                <strong>Ward:</strong> {session.admission.ward.name}
              </p>
              <p className="text-sm">
                <strong>Time In:</strong>{' '}
                {new Date(session.timeIn).toLocaleString()}
              </p>
              <div className="my-4">
                <ElapsedTime
                  timeIn={session.timeIn}
                  timeOut={session.timeOut}
                  big
                />
              </div>
              <div className="card-actions justify-end">
                <button
                  onClick={() => endSessionMutation.mutate(session.id)}
                  className="btn btn-error"
                >
                  End Session
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveSessionsDashboard;
