// prisma/seed.ts
import { prisma } from '@/lib/prisma';
async function main() {
  // Create Wards
  const wardNames = ['Ward A', 'Ward B', 'Ward C', 'Ward D'];
  const wards = await Promise.all(
    wardNames.map((name) => prisma.ward.create({ data: { name } })),
  );

  // Create Patients
  for (const ward of wards) {
    const patientPromises = [];
    for (let i = 1; i <= 20; i++) {
      patientPromises.push(
        prisma.patient.create({
          data: {
            name: `Patient ${i} - ${ward.name}`,
            wardId: ward.id,
          },
        }),
      );
    }
    await Promise.all(patientPromises);
  }

  // Create Activities
  const activityNames = ['Art Therapy', 'Social Hub', 'Cyber Cafe', 'Gym'];
  await Promise.all(
    activityNames.map((name) => prisma.activity.create({ data: { name } })),
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
