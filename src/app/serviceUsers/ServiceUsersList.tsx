// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { ServiceUser, ServiceUserStatus } from '@/types/serviceUser';

// const ServiceUsersList: React.FC = () => {
//   const [serviceUsers, setServiceUsers] = useState<ServiceUser[]>([]);
//   const [statusFilter, setStatusFilter] = useState<ServiceUserStatus | 'all'>(
//     'all',
//   );

//   const fetchServiceUsers = async () => {
//     const query = statusFilter !== 'all' ? `?status=${statusFilter}` : '';
//     const res = await fetch(`/api/serviceUsers${query}`);
//     if (res.ok) {
//       const data: ServiceUser[] = await res.json();
//       setServiceUsers(data);
//     } else {
//       console.error('Failed to fetch serviceUsers.');
//     }
//   };

//   useEffect(() => {
//     fetchServiceUsers();
//   }, [statusFilter]);

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <div>
//           <label htmlFor="statusFilter" className="mr-2">
//             Filter by Status:
//           </label>
//           <select
//             id="statusFilter"
//             value={statusFilter}
//             onChange={(e) =>
//               setStatusFilter(e.target.value as ServiceUserStatus | 'all')
//             }
//             className="border rounded px-2 py-1"
//           >
//             <option value="all">All</option>
//             <option value="admitted">Admitted</option>
//             <option value="discharged">Discharged</option>
//           </select>
//         </div>
//         <Link
//           href="/serviceUsers/new"
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//         >
//           Add ServiceUser
//         </Link>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//           <thead className="bg-gray-800 text-white">
//             <tr>
//               <th className="py-3 px-4 uppercase font-semibold text-sm">
//                 Name
//               </th>
//               <th className="py-3 px-4 uppercase font-semibold text-sm">
//                 Ward
//               </th>
//               <th className="py-3 px-4 uppercase font-semibold text-sm">
//                 Status
//               </th>
//               <th className="py-3 px-4 uppercase font-semibold text-sm">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-700">
//             {serviceUsers.map((user) => (
//               <tr key={user.id} className="border-b hover:bg-gray-100">
//                 <td className="py-3 px-4">{user.name}</td>
//                 <td className="py-3 px-4">
//                   {user.ward?.name || <span className="text-red-500">No Ward</span>}
//                 </td>
//                 <td
//                     className={`py-3 px-4 ${
//                       user.status === 'admitted'
//                         ? 'text-green-500'
//                         : user.status === 'discharged'
//                         ? 'text-red-500'
//                         : 'text-gray-500'
//                     }`}
//                   >
//                     {user.status
//                       ? user.status.charAt(0).toUpperCase() + user.status.slice(1)
//                       : 'Unknown Status'}
//                   </td>

//                 <td className="py-3 px-4 space-x-2">
//                   <Link
//                     href={`/serviceUsers/${user.id}/edit`}
//                     className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
//                   >
//                     Edit
//                   </Link>
//                   <button
//                     onClick={() =>
//                       confirm('Are you sure?') &&
//                       fetch(`/api/serviceUsers/${user.id}`, { method: 'DELETE' }).then(() =>
//                         fetchServiceUsers(),
//                       )
//                     }
//                     className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {serviceUsers.length === 0 && (
//               <tr>
//                 <td colSpan={4} className="text-center py-4">
//                   No service users found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ServiceUsersList;

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ServiceUser } from '@/types/serviceUser';
import { useServiceUsers } from '@/hooks/useServiceUsers';
import { InView } from 'react-intersection-observer';

const ServiceUsersList: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<
    'admitted' | 'discharged' | 'all'
  >('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [groupByWard, setGroupByWard] = useState<boolean>(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useServiceUsers({
      statusFilter,
      sortBy,
      order,
      groupByWard,
    });

  const handleStatusFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setStatusFilter(e.target.value as 'admitted' | 'discharged' | 'all');
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(e.target.value as 'asc' | 'desc');
  };

  const handleGroupByWardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupByWard(e.target.checked);
  };

  return (
    <div>
      {/* Filters and Sorting */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="statusFilter" className="mr-2">
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="border rounded px-2 py-1"
          >
            <option value="all">All</option>
            <option value="admitted">Admitted</option>
            <option value="discharged">Discharged</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="sortBy" className="mr-2">
            Sort By:
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={handleSortChange}
            className="border rounded px-2 py-1"
          >
            <option value="name">Name</option>
            <option value="nhsNumber">NHS Number</option>
          </select>
          <label htmlFor="order" className="mr-2">
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
        <div className="flex items-center space-x-2">
          <label htmlFor="groupByWard" className="mr-2">
            Group by Ward:
          </label>
          <input
            type="checkbox"
            id="groupByWard"
            checked={groupByWard}
            onChange={handleGroupByWardChange}
            className="h-4 w-4 text-blue-600"
          />
        </div>
        <Link
          href="/serviceUsers/new"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Service User
        </Link>
      </div>

      {/* Service Users List */}
      <div className="overflow-x-auto">
        {!groupByWard ? (
          // Ungrouped List
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 uppercase font-semibold text-sm">
                  Name
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm">
                  Ward
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm">
                  Status
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {data?.pages.map((page, pageIndex) => (
                <React.Fragment key={pageIndex}>
                  {page.serviceUsers.map((user: ServiceUser) => {
                    const latestAdmission = user.admissions[0];
                    const wardName = latestAdmission?.ward?.name || 'No Ward';
                    const isAdmitted =
                      latestAdmission && !latestAdmission.dischargeDate;

                    return (
                      <tr key={user.id} className="border-b hover:bg-gray-100">
                        <td className="py-3 px-4">{user.name}</td>
                        <td className="py-3 px-4">{wardName}</td>
                        <td
                          className={`py-3 px-4 ${
                            isAdmitted ? 'text-green-500' : 'text-red-500'
                          }`}
                        >
                          {isAdmitted ? 'Admitted' : 'Discharged'}
                        </td>
                        <td className="py-3 px-4 space-x-2">
                          <Link
                            href={`/serviceUsers/${user.id}/edit`}
                            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        ) : (
          // Grouped List
          data?.pages.map((page, pageIndex) => (
            <div key={pageIndex}>
              {Object.entries(page.serviceUsers).map(
                ([wardName, users]: [string, ServiceUser[]]) => (
                  <div key={wardName}>
                    <h2 className="text-xl font-semibold mt-4 mb-2">
                      {wardName}
                    </h2>
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                      <thead className="bg-gray-800 text-white">
                        <tr>
                          <th className="py-3 px-4 uppercase font-semibold text-sm">
                            Name
                          </th>
                          <th className="py-3 px-4 uppercase font-semibold text-sm">
                            Status
                          </th>
                          <th className="py-3 px-4 uppercase font-semibold text-sm">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-700">
                        {users.map((user) => {
                          const latestAdmission = user.admissions[0];
                          const isAdmitted =
                            latestAdmission && !latestAdmission.dischargeDate;
                          return (
                            <tr
                              key={user.id}
                              className="border-b hover:bg-gray-100"
                            >
                              <td className="py-3 px-4">{user.name}</td>
                              <td
                                className={`py-3 px-4 ${
                                  isAdmitted ? 'text-green-500' : 'text-red-500'
                                }`}
                              >
                                {isAdmitted ? 'Admitted' : 'Discharged'}
                              </td>
                              <td className="py-3 px-4 space-x-2">
                                <Link
                                  href={`/serviceUsers/${user.id}/edit`}
                                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                >
                                  Edit
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ),
              )}
            </div>
          ))
        )}

        {/* Infinite Scrolling */}
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

        {!hasNextPage && (
          <div className="h-10 bg-gray-200 text-center">
            <p>No more service users to load.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceUsersList;

// src/app/serviceUsers/ServiceUsersList.tsx
