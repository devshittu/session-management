// // app/reports/page.tsx
// import { useState, useEffect } from 'react';
// import BarChart from '@/components/BarChart';
// import PieChart from '@/components/PieChart';
// import ReportControls from '@/components/ReportControls';
// import { TimeFrame, ActivityReport } from '@/types/report';
// import { getActivityReport } from '@/lib/reports';

// export default function ReportsPage() {
//   const [timeFrame, setTimeFrame] = useState<TimeFrame>('daily');
//   const [reportData, setReportData] = useState<ActivityReport[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   const fetchReport = async (tf: TimeFrame) => {
//     setLoading(true);
//     const res = await fetch(`/api/reports?timeFrame=${tf}`);
//     const data: ActivityReport[] = await res.json();
//     setReportData(data);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchReport(timeFrame);
//   }, [timeFrame]);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Activity Reports</h1>
//       <ReportControls selectedTimeFrame={timeFrame} onChange={setTimeFrame} />
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <BarChart data={reportData} />
//           <PieChart data={reportData} />
//         </div>
//       )}
//     </div>
//   );
// }

// app/reports/page.tsx
import Reports from '@/components/Reports';

export default function ReportsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Activity Reports</h1>
      <Reports />
    </div>
  );
}
