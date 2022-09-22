async function travelDays(parent, args, context) {
  return await context.prisma.travelDays
    .findMany({ where: { travelId: parent.id } })
}

module.exports = {
  travelDays,
};
