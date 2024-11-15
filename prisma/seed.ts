// prisma/seed.ts
// import { prisma } from '@/lib/prisma';
import { prisma } from '../src/lib/prisma';

async function main() {
  // Create Wards
  const wardNames = ['Elm', 'Juniper', 'Mulberry', 'Palm'];
  const wards = await Promise.all(
    wardNames.map((name) =>
      prisma.ward.create({
        data: { name },
      }),
    ),
  );

  // Create ServiceUsers
  for (const ward of wards) {
    const serviceUserPromises = [];
    for (let i = 1; i <= 20; i++) {
      serviceUserPromises.push(
        prisma.serviceUser.create({
          data: {
            name: `ServiceUser ${i} - ${ward.name}`,
            wardId: ward.id,
            status: 'admitted', // Default status
          },
        }),
      );
    }
    await Promise.all(serviceUserPromises);
  }

  // Create Activities
  const activityNames = ['Art Therapy', 'Social Hub', 'Cyber Cafe', 'Gym'];
  await Promise.all(
    activityNames.map((name) =>
      prisma.activity.create({
        data: { name },
      }),
    ),
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
