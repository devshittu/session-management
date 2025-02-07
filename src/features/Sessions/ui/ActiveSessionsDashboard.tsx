'use client';

import React, { useCallback, useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useActiveSessions } from '../hooks/useActiveSessions';
import ElapsedTime from './ElapsedTime';

const ActiveSessionsDashboard: React.FC = () => {
  // Maintain sortOrder state: 'asc' for earliest-first, 'desc' for latest-first.
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');
  const queryClient = useQueryClient();
  const router = useRouter();

  // The hook uses sortBy and order as query key parts so that refetch occurs on change.
  const { data, isLoading, isError, error } = useActiveSessions({
    sortBy: 'timeIn',
    order: sortOrder,
  });

  // Memoize sessions extraction so that its reference remains stable
  const sessions = useMemo(() => data?.sessions || [], [data]);

  // Memoize the sessions to display (only up to 6)
  const sessionsToDisplay = useMemo(() => sessions.slice(0, 6), [sessions]);

  // Toggle sort order between 'asc' and 'desc'
  const toggleSortOrder = useCallback(() => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    // The useActiveSessions hook re-runs automatically because the query key changes.
  }, []);

  // Mutation to end a session.
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

  // Memoized render function to avoid unnecessary re-renders.
  const renderSession = useCallback(
    (session: any) => (
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
    ),
    [endSessionMutation], // Added endSessionMutation as dependency
  );

  if (isLoading)
    return <p className="text-center">Loading active sessions...</p>;
  if (isError)
    return <p className="text-center text-error">Error: {error?.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Active Sessions</h1>
        <div className="flex items-center space-x-4">
          <div className="badge badge-lg">Total Active: {data?.total || 0}</div>
          <button className="btn btn-outline" onClick={toggleSortOrder}>
            {sortOrder === 'asc' ? 'Earliest First' : 'Latest First'}
          </button>
          {data?.total && data.total > 6 && (
            <Link href="/sessions/active" className="btn btn-primary">
              View All
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sessionsToDisplay.map(renderSession)}
      </div>
    </div>
  );
};

export default ActiveSessionsDashboard;
// src/features/Sessions/ui/ActiveSessionsDashboard.tsx
