// 1
const { PrismaClient } = require("@prisma/client");

// 2
const prisma = new PrismaClient();

// 3
async function main() {
  const newTravel = await prisma.travel.update({
    data: {
        title: "My journey to Dream islands",
        country: "Dream islands",
        location: "Vulkan city",
        description: "This was the best place ever. Nice beaches etc...",
        author: "David",
        travelCompanions: 2,
        rating: 3,
        dateRange: {
            start: "2022-05-05",
            end: "2022-05-06"
        }
    },
  });
  const allTravel = await prisma.travel.findMany();
  console.log(allTravel);
}

// 4
main()
  .catch((e) => {
    throw e;
  })
  // 5
  .finally(async () => {
    await prisma.$disconnect();
  });
