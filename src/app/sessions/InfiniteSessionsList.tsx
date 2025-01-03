'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { InView } from 'react-intersection-observer';
import Link from 'next/link';

import {
  Session,
  SessionsResponse,
  GroupedResponse,
  GroupedSession,
  ServiceUserStatus,
} from '@/types/serviceUser';
import { useSessions } from '@/hooks/useSessions';
import ElapsedTime from './ElapsedTime';

// Union type that can be either a normal sessions response or a grouped aggregator result
type SessionsData = SessionsResponse | GroupedResponse;

const InfiniteSessionsList: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>('timeIn');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [groupBy, setGroupBy] = useState<
    'none' | 'timeIn' | 'activityId' | 'admissionId'
  >('none');

  const router = useRouter();

  // 1) `data` is an infinite query result with pages of type SessionsData
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useSessions({ sortBy, order, groupBy });

  // 2) Explicitly type the `page` and `pageIndex` in the map callback
  const renderPage = (page: SessionsData, pageIndex: number) => {
    if ('groupedData' in page) {
      // aggregator approach
      return (
        <React.Fragment key={pageIndex}>
          {page.groupedData.map((group: GroupedSession, idx) => (
            <div key={idx} className="border-b p-4">
              {group.timeIn && (
                <p>
                  <strong>timeIn:</strong> {group.timeIn}
                </p>
              )}
              {group.admissionId && (
                <p>
                  <strong>Admission:</strong> {group.admissionId}
                </p>
              )}
              {group.activityId && (
                <p>
                  <strong>Activity:</strong> {group.activityId}
                </p>
              )}
              <p>
                <strong>Count:</strong> {group._count._all}
              </p>
            </div>
          ))}
        </React.Fragment>
      );
    } else {
      // normal (non-aggregator) approach
      return (
        <React.Fragment key={pageIndex}>
          {page.sessions.map((session: Session) => (
            <div key={session.id} className="border-b p-4">
              <p>
                <strong>Service User:</strong>{' '}
                {session.admission.serviceUser.name}
              </p>
              <p>
                <strong>Activity:</strong> {session.activity.name}
              </p>
              <p>
                <strong>Time In:</strong>{' '}
                {new Date(session.timeIn).toLocaleString()}
              </p>
              <p>
                <strong>Time Out:</strong>{' '}
                {session.timeOut
                  ? new Date(session.timeOut).toLocaleString()
                  : 'In Progress'}
              </p>
              <p>
                <strong>Elapsed Time:</strong>{' '}
                <ElapsedTime
                  timeIn={session.timeIn}
                  timeOut={session.timeOut}
                />
              </p>
              {!session.timeOut && (
                <button
                  onClick={() => handleEndSession(session.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mt-2"
                >
                  End Session
                </button>
              )}
            </div>
          ))}
        </React.Fragment>
      );
    }
  };

  const handleEndSession = async (sessionId: number) => {
    try {
      const response = await fetch(`/api/sessions/${sessionId}/end`, {
        method: 'POST',
      });
      if (response.ok) {
        router.refresh();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to end session');
      }
    } catch (error) {
      console.error('Error ending session:', error);
      alert('An unexpected error occurred.');
    }
  };

  // Handlers
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };
  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(e.target.value as 'asc' | 'desc');
  };
  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGroupBy(
      e.target.value as 'none' | 'timeIn' | 'activityId' | 'admissionId',
    );
  };

  return (
    <div>
      {/* Controls: sort, order, group */}
      <div className="flex space-x-2 mb-4">
        <label htmlFor="sortBy">Sort By:</label>
        <select id="sortBy" value={sortBy} onChange={handleSortChange}>
          <option value="timeIn">timeIn</option>
          <option value="activityName">activityName (nested sort)</option>
          <option value="serviceUserName">serviceUserName (nested sort)</option>
        </select>

        <label htmlFor="order">Order:</label>
        <select id="order" value={order} onChange={handleOrderChange}>
          <option value="asc">asc</option>
          <option value="desc">desc</option>
        </select>

        <label htmlFor="groupBy">Group By:</label>
        <select id="groupBy" value={groupBy} onChange={handleGroupChange}>
          <option value="none">None</option>
          <option value="timeIn">timeIn</option>
          <option value="activityId">activityId</option>
          <option value="admissionId">admissionId</option>
        </select>
      </div>

      {/* Data */}
      <div className="overflow-y-auto max-h-[calc(100vh-150px)]">
        {/* 1) map each 'page' in data.pages,
            2) explicitly type parameters */}

        {/*  @ts-ignore */}
        {data?.pages.map((page: SessionsData, pageIndex: number) =>
          renderPage(page, pageIndex),
        )}

        {hasNextPage && (
          <InView
            onChange={(inView) => {
              if (inView && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
          >
            {({ ref }) => (
              <div ref={ref} className="h-10 bg-gray-200 text-center">
                {isFetchingNextPage ? (
                  <p>Loading more...</p>
                ) : (
                  <p>Load more...</p>
                )}
              </div>
            )}
          </InView>
        )}

        {!hasNextPage && !isFetching && (
          <div className="h-10 bg-gray-200 text-center">
            <p>No more sessions to load.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfiniteSessionsList;
// src/app/sessions/InfiniteSessionsList.tsx
