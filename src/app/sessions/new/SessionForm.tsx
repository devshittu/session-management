// app/sessions/SessionForm.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';

type Patient = {
  id: number;
  name: string;
};

type Activity = {
  id: number;
  name: string;
};

type Props = {
  patients: Patient[];
  activities: Activity[];
};

const SessionForm = ({ patients, activities }: Props) => {
  const router = useRouter();
  const [patientId, setPatientId] = useState<number | ''>('');
  const [activityId, setActivityId] = useState<number | ''>('');

  const startSession = async (e: FormEvent) => {
    e.preventDefault();
    if (patientId === '' || activityId === '') {
      alert('Please select both patient and activity.');
      return;
    }

    const response = await fetch('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patientId, activityId }),
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
        <label htmlFor="patientId">Patient:</label>
        <select
          name="patientId"
          id="patientId"
          value={patientId}
          onChange={(e) => setPatientId(Number(e.target.value))}
          required
        >
          <option value="">Select Patient</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name}
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
