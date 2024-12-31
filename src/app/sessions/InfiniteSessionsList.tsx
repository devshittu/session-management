// 'use client';

// import { useSessions } from '@/hooks/useSessions';
// import { InView } from 'react-intersection-observer';
// import { Session } from '@/types/serviceUser';
// import { useRouter } from 'next/navigation';
// import ElapsedTime from './ElapsedTime';
// import Link from 'next/link';
// import React, { useState } from 'react';

// const InfiniteSessionsList = () => {
//   const [sortBy, setSortBy] = useState<string>('timeIn');
//   const [order, setOrder] = useState<'asc' | 'desc'>('asc');
//   const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, refetch } = useSessions({
//     sortBy,
//     order,
//   });
//   const router = useRouter();

//   const handleEndSession = async (sessionId: number) => {
//     const response = await fetch(`/api/sessions/${sessionId}/end`, {
//       method: 'POST',
//     });
//     if (response.ok) {
//       router.refresh();
//     } else {
//       alert('Failed to end session');
//     }
//   };

//   const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSortBy(e.target.value);
//     refetch();
//   };

//   const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setOrder(e.target.value as 'asc' | 'desc');
//     refetch();
//   };

//   return (
//     <div>
//       {/* Sorting Controls */}
//       <div className="flex justify-end mb-4 space-x-2">
//         <label htmlFor="sortBy" className="text-sm font-medium">
//           Sort By:
//         </label>
//         <select
//           id="sortBy"
//           value={sortBy}
//           onChange={handleSortChange}
//           className="border rounded px-2 py-1"
//         >
//           <option value="timeIn">Time In</option>
//           <option value="activityId">Activity</option>
//           <option value="serviceUserId">Service User</option>
//         </select>

//         <label htmlFor="order" className="text-sm font-medium">
//           Order:
//         </label>
//         <select
//           id="order"
//           value={order}
//           onChange={handleOrderChange}
//           className="border rounded px-2 py-1"
//         >
//           <option value="asc">Ascending</option>
//           <option value="desc">Descending</option>
//         </select>
//       </div>

//       {/* Sessions List */}
//       <div className="overflow-y-auto max-h-[calc(100vh-150px)]">
//         {data?.pages.map((page, pageIndex) => (
//           <React.Fragment key={pageIndex}>
//             {page.sessions.map((session) => (
//               <div key={session.id} className="border-b p-4">
//                 <p>
//                   <strong>Service User:</strong> {session.admission.serviceUser.name}
//                 </p>
//                 <p>
//                   <strong>Activity:</strong> {session.activity.name}
//                 </p>
//                 <p>
//                   <strong>Time In:</strong> {new Date(session.timeIn).toLocaleString()}
//                 </p>
//                 <p>
//                   <strong>Time Out:</strong> {session.timeOut ? new Date(session.timeOut).toLocaleString() : 'In Progress'}
//                 </p>
//                 <p>
//                   <strong>Elapsed Time:</strong> <ElapsedTime timeIn={session.timeIn} timeOut={session.timeOut} />
//                 </p>
//                 {!session.timeOut && (
//                   <button
//                     onClick={() => handleEndSession(session.id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mt-2"
//                   >
//                     End Session
//                   </button>
//                 )}
//               </div>
//             ))}
//           </React.Fragment>
//         ))}

//         {hasNextPage && (
//           <InView
//             onChange={(inView) => {
//               if (inView) fetchNextPage();
//             }}
//           >
//             {({ ref }) => (
//               <div ref={ref} className="h-10 bg-gray-200 text-center">
//                 {isFetchingNextPage ? <p>Loading more...</p> : <p>Load more...</p>}
//               </div>
//             )}
//           </InView>
//         )}

//         {!hasNextPage && !isFetching && (
//           <div className="h-10 bg-gray-200 text-center">
//             <p>No more sessions to load.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InfiniteSessionsList;

'use client';

import { useSessions } from '@/hooks/useSessions';
import { InView } from 'react-intersection-observer';
import { Session } from '@/types/serviceUser';
import { useRouter } from 'next/navigation';
import ElapsedTime from './ElapsedTime';
import Link from 'next/link';
import React, { useState } from 'react';

const InfiniteSessionsList = () => {
  const [sortBy, setSortBy] = useState<string>('timeIn');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useSessions({
      sortBy,
      order,
    });
  const router = useRouter();

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

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    // Refetch is automatically handled by useInfiniteQuery with the updated queryKey
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(e.target.value as 'asc' | 'desc');
    // Refetch is automatically handled by useInfiniteQuery with the updated queryKey
  };

  return (
    <div>
      {/* Sorting Controls */}
      <div className="flex justify-end mb-4 space-x-2">
        <label htmlFor="sortBy" className="text-sm font-medium">
          Sort By:
        </label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={handleSortChange}
          className="border rounded px-2 py-1"
        >
          <option value="timeIn">Time In</option>
          <option value="activityName">Activity</option>
          <option value="serviceUserName">Service User</option>
        </select>

        <label htmlFor="order" className="text-sm font-medium">
          Order:
        </label>
        <select
          id="order"
          value={order}
          onChange={handleOrderChange}
          className="border rounded px-2 py-1"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Sessions List */}
      <div className="overflow-y-auto max-h-[calc(100vh-150px)]">
        {data?.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.sessions.map((session) => (
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
        ))}

        {hasNextPage && (
          <InView
            onChange={(inView) => {
              if (inView) fetchNextPage();
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
