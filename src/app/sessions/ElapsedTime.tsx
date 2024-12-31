// app/sessions/ElapsedTime.tsx
'use client';

import { useEffect, useState } from 'react';

type Props = {
  timeIn: string;
  timeOut?: string | null;
};

const ElapsedTime = ({ timeIn, timeOut }: Props) => {
  const [elapsed, setElapsed] = useState<string>('');

  useEffect(() => {
    const start = new Date(timeIn);
    const end = timeOut ? new Date(timeOut) : null;

    const calculateElapsed = () => {
      const now = new Date();
      const endTime = end || now;
      const diffMs = endTime.getTime() - start.getTime();

      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      setElapsed(`${diffHours}h ${diffMinutes}m ${diffSeconds}s`);
    };

    calculateElapsed();
    const interval = setInterval(calculateElapsed, 1000);

    return () => clearInterval(interval);
  }, [timeIn, timeOut]);

  return (
    <span className={timeOut ? 'text-gray-500' : 'text-blue-500'}>
      {timeOut ? elapsed : elapsed}
    </span>
  );
};

export default ElapsedTime;

// src/app/sessions/ElapsedTime.tsx
