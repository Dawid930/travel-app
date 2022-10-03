const travels = async (parent, args, context) => {
  return await context.prisma.travel.findMany({
    include: {
      dateRange: true,
      travelDays: { include: { addedBy: true } },
      addedBy: true,
    },
    skip: args.skip,
    take: args.take
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

module.exports = {
  travels,
  travel,
};
