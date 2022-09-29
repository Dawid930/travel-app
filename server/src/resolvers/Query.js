const travels = async (parent, args, context) => {
  return await context.prisma.travel.findMany({
    include: {
      dateRange: true,
      travelDays: { include: { addedBy: true } },
      addedBy: true,
    },
  });
};

module.exports = {
  travels,
};
