// app/patients/page.tsx
import { prisma } from '@/lib/prisma';

interface Patient {
  id: number;
  name: string;
  ward: { name: string };
}

export default async function PatientsPage() {
  const patients: Patient[] = await prisma.patient.findMany({
    include: { ward: true },
  });

  return (
    <div>
      <h1>Patients</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Ward</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.name}</td>
              <td>{patient.ward.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
