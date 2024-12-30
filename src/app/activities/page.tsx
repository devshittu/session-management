// import { prisma } from '@/lib/prisma';

// export default async function ActivitiesPage() {
//   const activities = await prisma.activity.findMany();

//   return (
//     <div>
//       <h1>Activities</h1>
//       <ul>
//         {activities.map((activity) => (
//           <li key={activity.id}>{activity.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// 'use client';

// import { useEffect, useState } from 'react';

// export default function ActivitiesPage() {
//   const [activities, setActivities] = useState([]);
//   const [newActivity, setNewActivity] = useState('');

//   const fetchActivities = async () => {
//     const res = await fetch('/api/activities');
//       // Check if response is valid
//       if (!res.ok) {
//         throw new Error(`HTTP error! Status: ${res.status}`);
//       }
//     const data = await res.json();

//       console.log('activities data:// ', data);
//       setActivities(data);
//   };

//   const createActivity = async () => {
//     await fetch('/api/activities', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name: newActivity }),
//     });
//     setNewActivity('');
//     fetchActivities();
//   };

//   const deleteActivity = async (id: number) => {
//     await fetch('/api/activities', {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id }),
//     });
//     fetchActivities();
//   };

//   const updateActivity = async (id: number, name: string) => {
//     await fetch('/api/activities', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id, name }),
//     });
//     fetchActivities();
//   };

//   useEffect(() => {
//     fetchActivities();
//   }, []);
//   return (
//     <div>
//       <h1 className="text-xl font-bold">Activities</h1>
//       <div>
//         <input
//           type="text"
//           value={newActivity}
//           onChange={(e) => setNewActivity(e.target.value)}
//           placeholder="New Activity Name"
//           className="border rounded px-2 py-1"
//         />
//         <button
//           onClick={createActivity}
//           className="ml-2 bg-blue-500 text-white px-4 py-1 rounded"
//         >
//           Add
//         </button>
//       </div>
//       <ul className="mt-4">
//         {activities.map((activity: any) => (
//           <li key={activity.id} className="flex justify-between items-center">
//             <span>
//               {activity.name} (Created: {new Date(activity.createdAt).toLocaleString()})
//             </span>
//             <button
//               onClick={() => deleteActivity(activity.id)}
//               className="bg-red-500 text-white px-4 py-1 rounded ml-2"
//             >
//               Delete
//             </button>
//             <button
//               onClick={() => updateActivity(activity.id, prompt('New Name:', activity.name) || activity.name)}
//               className="bg-yellow-500 text-white px-4 py-1 rounded ml-2"
//             >
//               Edit
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function ActivitiesPage() {
  const activities = await prisma.activity.findMany();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Activities</h1>
      <Link href="/activities/new" className="text-blue-500 hover:underline">
        Create New Activity
      </Link>
      <ul className="mt-4">
        {activities.map((activity) => (
          <li key={activity.id} className="flex justify-between items-center mb-2">
            <span>{activity.name}</span>
            <div>
              <Link
                href={`/activities/${activity.id}/edit`}
                className="text-blue-500 hover:underline mr-2"
              >
                Edit
              </Link>
              <Link
                href={`/activities/${activity.id}/delete`}
                className="text-red-500 hover:underline"
              >
                Delete
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// src/app/activities/page.tsx