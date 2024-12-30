'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';

type Admission = {
  id: number;
  serviceUser: { id: number; name: string };
};

type Activity = {
  id: number;
  name: string;
};

type Props = {
  admissions: Admission[];
  activities: Activity[];
};

const SessionForm = ({ admissions, activities }: Props) => {
  const router = useRouter();
  const [admissionId, setAdmissionId] = useState<number | ''>('');
  const [activityId, setActivityId] = useState<number | ''>('');

  const startSession = async (e: FormEvent) => {
    e.preventDefault();
    if (admissionId === '' || activityId === '') {
      alert('Please select both admission and activity.');
      return;
    }

    const response = await fetch('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ admissionId, activityId }),
    });

    if (response.ok) {
      router.push('/sessions');
    } else {
      alert('Failed to start session');
    }
  };

  return (
    <form onSubmit={startSession} className="space-y-4">
      <div>
        <label htmlFor="admissionId" className="block font-medium">
          Service User:
        </label>
        <select
          name="admissionId"
          id="admissionId"
          value={admissionId}
          onChange={(e) => setAdmissionId(Number(e.target.value))}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select Service User</option>
          {admissions.map((admission) => (
            <option key={admission.id} value={admission.id}>
              {admission.serviceUser.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="activityId" className="block font-medium">
          Activity:
        </label>
        <select
          name="activityId"
          id="activityId"
          value={activityId}
          onChange={(e) => setActivityId(Number(e.target.value))}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select Activity</option>
          {activities.map((activity) => (
            <option key={activity.id} value={activity.id}>
              {activity.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Start Session
      </button>
    </form>
  );
};

export default SessionForm;

// src/app/sessions/new/SessionForm.tsx