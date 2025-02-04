'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { toast } from 'react-toastify';

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
  const [loading, setLoading] = useState<boolean>(false);

  const startSession = async (e: FormEvent) => {
    e.preventDefault();
    if (admissionId === '' || activityId === '') {
      toast.error('Please select both a service user and an activity.');
      return;
    }

    setLoading(true);
    const response = await fetch('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ admissionId, activityId }),
    });

    setLoading(false);

    if (response.ok) {
      toast.success('Session started successfully!');
      router.push('/sessions');
    } else {
      toast.error('Failed to start session.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screenx bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-primary">Start a New Session</h2>
          <form onSubmit={startSession} className="space-y-4">
            {/* Service User Select */}
            <div className="form-control">
              <label className="label" htmlFor="admissionId">
                <span className="label-text font-medium">
                  Select Service User
                </span>
              </label>
              <select
                name="admissionId"
                id="admissionId"
                value={admissionId}
                onChange={(e) => setAdmissionId(Number(e.target.value))}
                required
                className="select select-bordered w-full"
              >
                <option value="">Choose a Service User</option>
                {admissions.map((admission) => (
                  <option key={admission.id} value={admission.id}>
                    {admission.serviceUser.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Activity Select */}
            <div className="form-control">
              <label className="label" htmlFor="activityId">
                <span className="label-text font-medium">Select Activity</span>
              </label>
              <select
                name="activityId"
                id="activityId"
                value={activityId}
                onChange={(e) => setActivityId(Number(e.target.value))}
                required
                className="select select-bordered w-full"
              >
                <option value="">Choose an Activity</option>
                {activities.map((activity) => (
                  <option key={activity.id} value={activity.id}>
                    {activity.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-4">
              <button
                type="submit"
                className={`btn btn-primary w-full ${loading ? 'btn-disabled' : ''}`}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  'Start Session'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SessionForm;

// src/app/sessions/new/SessionForm.tsx
