// components/Reports.tsx
'use client';

import { useState, useEffect } from 'react';
import ReportControls from '@/components/ReportControls';
// import BarChart from '@/components/BarChart';
// import PieChart from '@/components/PieChart';
import { TimeFrame, ActivityReport } from '@/types/report';
import CustomBarChart from '@/components/BarChart';
import CustomPieChart from '@/components/PieChart';

const Reports: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('daily');
  const [reportData, setReportData] = useState<ActivityReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchReport = async (tf: TimeFrame) => {
    setLoading(true);
    const res = await fetch(`/api/reports?timeFrame=${tf}`);
    if (res.ok) {
      const data: ActivityReport[] = await res.json();
      setReportData(data);
    } else {
      console.error('Failed to fetch report data');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReport(timeFrame);
  }, [timeFrame]);

  return (
    <div>
      <ReportControls selectedTimeFrame={timeFrame} onChange={setTimeFrame} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-whitex p-4 shadow-md rounded-lg">
            <CustomBarChart data={reportData} />
          </div>
          <div className="bg-whitex p-4 shadow-md rounded-lg">
            <CustomPieChart data={reportData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
