// components/ServiceUsersList.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import { ServiceUser, ServiceUserStatus } from '@/types/serviceUser';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ServiceUsersList: React.FC = () => {
  const [serviceUsers, setServiceUsers] = useState<ServiceUser[]>([]);
  const [statusFilter, setStatusFilter] = useState<ServiceUserStatus | 'all'>(
    'all',
  );
  const router = useRouter();

  const fetchServiceUsers = async () => {
    const query = statusFilter !== 'all' ? `?status=${statusFilter}` : '';
    const res = await fetch(`/api/serviceUsers${query}`);
    if (res.ok) {
      const data: ServiceUser[] = await res.json();
      console.log('data:// ', data);
      setServiceUsers(data);
    } else {
      console.error('Failed to fetch serviceUsers.');
    }
  };

  useEffect(() => {
    fetchServiceUsers();
  }, [statusFilter]);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this serviceUser?')) return;

    const res = await fetch(`/api/serviceUsers/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setServiceUsers((prev) =>
        prev.filter((serviceUser) => serviceUser.id !== id),
      );
    } else {
      alert('Failed to delete serviceUser.');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <label htmlFor="statusFilter" className="mr-2">
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as ServiceUserStatus | 'all')
            }
            className="border rounded px-2 py-1"
          >
            <option value="all">All</option>
            <option value="admitted">Admitted</option>
            <option value="discharged">Discharged</option>
          </select>
        </div>
        <Link
          href="/serviceUsers/new"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add ServiceUser
        </Link>
      </div>
      <div className="overflow-x-auto">
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
            {serviceUsers.map((serviceUser) => (
              <tr key={serviceUser.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4">{serviceUser.name}</td>
                <td className="py-3 px-4">{serviceUser.ward.name}</td>
                <td
                  className={`py-3 px-4 ${serviceUser.status === 'admitted' ? 'text-green-500' : 'text-red-500'}`}
                >
                  {serviceUser.status.charAt(0).toUpperCase() +
                    serviceUser.status.slice(1)}
                </td>
                <td className="py-3 px-4 space-x-2">
                  <Link
                    href={`/serviceUsers/${serviceUser.id}/edit`}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(serviceUser.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {serviceUsers.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No serviceUsers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceUsersList;
