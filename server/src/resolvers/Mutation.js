async function addTravel(parent, args, context, info) {
  return await context.prisma.travel.create({
    data: {
      title: args.input.title,
      country: args.input.country,
      location: args.input.location,
      description: args.input.description,
      author: args.input.author,
      travelCompanions: args.input.travelCompanions,
      rating: args.input.rating,
    },
  });
}

async function addTravelDay(parent, args, context, info) {
  return await context.prisma.travelDays.create({
    data: {
      daynumber: args.input.daynumber,
      date: args.input.date,
      description: args.input.description,
      author: args.input.author,
      travelId: args.input.travelId,
    },
  });
}
module.exports = {
  addTravel,
  addTravelDay
};
