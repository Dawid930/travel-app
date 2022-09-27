// 1
const { PrismaClient } = require("@prisma/client");

// 2
const prisma = new PrismaClient();

// 3
async function main(parent, { id, input }, context) {
  const newTravel = await context.prisma.travel.delete({
    where: {
        id: id
    },
    data: {
       ...context.prisma.travel,
       input
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
