import "dotenv/config";
import { prisma } from "../src/config/db.config";

async function main() {

  await prisma.challenge.createMany({
    data: [
      { name: "Stress" },
      { name: "Anxiety" },
      { name: "Confidence" },
      { name: "Career Growth" },
      { name: "Relationships" },
      { name: "Work-Life Balance" }
    ],
    skipDuplicates: true
  });

  await prisma.goal.createMany({
    data: [
      { name: "Reduce Stress" },
      { name: "Improve Confidence" },
      { name: "Better Relationships" },
      { name: "Career Advancement" },
      { name: "Personal Growth" }
    ],
    skipDuplicates: true
  });

  await prisma.program.createMany({
    data: [
      { name: "Mindfulness Coaching" },
      { name: "Life Coaching" },
      { name: "Leadership Coaching" },
      { name: "Relationship Coaching" }
    ],
    skipDuplicates: true
  });

  await prisma.callbackTime.createMany({
    data: [
      { label: "Morning (9AM - 12PM)" },
      { label: "Afternoon (12PM - 4PM)" },
      { label: "Evening (4PM - 7PM)" },
      { label: "Weekend" }
    ],
    skipDuplicates: true
  });

  console.log("Seed completed");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });