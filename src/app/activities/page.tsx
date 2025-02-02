// src/app/activities/page.tsx

import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { FiEdit, FiTrash } from 'react-icons/fi';

export default async function ActivitiesPage() {
  const activities = await prisma.activity.findMany();

  return (
    <div className="container mx-auto py-8">
      <h1 className="h2">Activities</h1>
      <div className="flex justify-between items-center mb-6">
        <Link href="/activities/new">
          <button className="btn btn-primary">+ Create New Activity</button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activities.map((activity) => (
          <div key={activity.id} className="card shadow-lg bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-lg font-semibold">
                {activity.name}
              </h2>
              <div className="card-actions justify-end">
                <Link href={`/activities/${activity.id}/edit`} passHref>
                  <button className="btn btn-sm btn-outline btn-info flex items-center gap-1">
                    <FiEdit />
                    Edit
                  </button>
                </Link>
                <Link href={`/activities/${activity.id}/delete`} passHref>
                  <button className="btn btn-sm btn-outline btn-error flex items-center gap-1">
                    <FiTrash />
                    Delete
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
