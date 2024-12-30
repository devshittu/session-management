

import { prisma } from '@/lib/prisma';
import { ServiceUser, ServiceUserStatus } from '@/types/serviceUser';
import EditServiceUserForm from './EditServiceUserForm';

type Params = {
  params: { id: string };
};

export default async function EditServiceUserPage({ params }: Params) {
  const serviceUserId = parseInt(params.id);

  if (isNaN(serviceUserId)) {
    return <p>Invalid serviceUser ID.</p>;
  }

  const serviceUser = await prisma.serviceUser.findUnique({
    where: { id: serviceUserId },
    include: {
      ward: true,
    },
  });

  if (!serviceUser) {
    return <p>ServiceUser not found.</p>;
  }

  const serializedServiceUser: ServiceUser = {
    ...serviceUser,
    createdAt: serviceUser.createdAt.toISOString(),
    updatedAt: serviceUser.updatedAt?.toISOString() || null,
    sessions: [],
    status: serviceUser.status as ServiceUserStatus,
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit ServiceUser</h1>
      <EditServiceUserForm serviceUser={serializedServiceUser} />
    </div>
  );
}


// src/app/serviceUsers/[id]/edit/page.tsx
