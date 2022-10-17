const travels = async (parent, args, context) => {
  return await context.prisma.travel.findMany({
    include: {
      dateRange: true,
      travelDays: { include: { addedBy: true } },
      addedBy: true,
    },
    skip: args.skip,
    take: args.take,
  });
};

const travel = async (parent, args, context) => {
  return await context.prisma.travel.findUnique({
    where: { id: args.id },
    include: {
      dateRange: true,
      travelDays: { include: { addedBy: true } },
      addedBy: true,
    },
  });
};

const travelDay = async (parent, args, context) => {
  return await context.prisma.travelDays.findUnique({
    where: { id: args.id },
    include: {
      addedBy: true,
    },
  });
};

const user = async (parent, args, context) => {
  return await context.prisma.user.findUnique({
    where: { id: args.id },
  });
};

module.exports = {
  travels,
  travel,
  travelDay,
  user,
};
