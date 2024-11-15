// // app/serviceUsers/page.tsx
// import { prisma } from '@/lib/prisma';

import ServiceUsersList from './ServiceUsersList';

// interface ServiceUser {
//   id: number;
//   name: string;
//   ward: { name: string };
// }

// export default async function ServiceUsersPage() {
//   const serviceUsers: ServiceUser[] = await prisma.serviceUser.findMany({
//     include: { ward: true },
//   });

//   return (
//     <div>
//       <h1>ServiceUsers</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Ward</th>
//           </tr>
//         </thead>
//         <tbody>
//           {serviceUsers.map((serviceUser) => (
//             <tr key={serviceUser.id}>
//               <td>{serviceUser.name}</td>
//               <td>{serviceUser.ward.name}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// app/serviceUsers/page.tsx

export default function ServiceUsersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">ServiceUsers</h1>
      <ServiceUsersList />
    </div>
  );
}
