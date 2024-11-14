// app/activities/page.tsx
import { prisma } from '@/lib/prisma';

export default async function ActivitiesPage() {
  const activities = await prisma.activity.findMany();

  return (
    <div>
      <h1>Activities</h1>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>{activity.name}</li>
        ))}
      </ul>
    </div>
  );
}
