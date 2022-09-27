async function travelDays(parent, args, context) {
  return await context.prisma.travelDays
    .findMany({ where: { travelId: parent.id } })
}

async function addedBy(parent, args, context) {
  return await context.prisma.travel.findUnique({ where: { id: parent.id } }).addedBy()
}




module.exports = {
  travelDays,
  addedBy,
  
};
