// app/sessions/SessionForm.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';

type ServiceUser = {
  id: number;
  name: string;
};

type Activity = {
  id: number;
  name: string;
};

type Props = {
  serviceUsers: ServiceUser[];
  activities: Activity[];
};

const SessionForm = ({ serviceUsers, activities }: Props) => {
  const router = useRouter();
  const [serviceUserId, setServiceUserId] = useState<number | ''>('');
  const [activityId, setActivityId] = useState<number | ''>('');

  const startSession = async (e: FormEvent) => {
    e.preventDefault();
    if (serviceUserId === '' || activityId === '') {
      alert('Please select both serviceUser and activity.');
      return;
    }

    const response = await fetch('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serviceUserId, activityId }),
    });

    if (response.ok) {
      router.push('/sessions');
    } else {
      alert('Failed to start session');
    }
  };

  return (
    <form onSubmit={startSession}>
      <div>
        <label htmlFor="serviceUserId">ServiceUser:</label>
        <select
          name="serviceUserId"
          id="serviceUserId"
          value={serviceUserId}
          onChange={(e) => setServiceUserId(Number(e.target.value))}
          required
        >
          <option value="">Select ServiceUser</option>
          {serviceUsers.map((serviceUser) => (
            <option key={serviceUser.id} value={serviceUser.id}>
              {serviceUser.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="activityId">Activity:</label>
        <select
          name="activityId"
          id="activityId"
          value={activityId}
          onChange={(e) => setActivityId(Number(e.target.value))}
          required
        >
          <option value="">Select Activity</option>
          {activities.map((activity) => (
            <option key={activity.id} value={activity.id}>
              {activity.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Start Session</button>
    </form>
  );
};

export default SessionForm;
