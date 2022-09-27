const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

async function addTravel(parent, args, context, info) {
  
  const { userId } = context;

  return await context.prisma.travel.create({
    data: {
      title: args.input.title,
      country: args.input.country,
      location: args.input.location,
      description: args.input.description,
      travelCompanions: args.input.travelCompanions,
      rating: args.input.rating,
      addedBy: { connect: { id: userId } },
    },
  });
}

async function updateTravel(parent, args, context, info) {
  return await context.prisma.travel.update({
    where: { id: args.id },
    data: {
      title: args.input.title,
      country: args.input.country,
      location: args.input.location,
      description: args.input.description,
      travelCompanions: args.input.travelCompanions,
      rating: args.input.rating,
    },
  });
}

async function deleteTravel(parent, args, context, info) {
  return await context.prisma.travel.delete({
    where: { id: args.id },
  });
}

async function addTravelDay(parent, args, context, info) {
  const { userId } = context;

  return await context.prisma.travelDays.create({
    data: {
      daynumber: args.input.daynumber,
      date: args.input.date,
      description: args.input.description,
      travelId: args.input.travelId,
      addedBy: { connect: { id: userId } },
    },
  });
}

async function updateTravelDay(parent, args, context, info) {
  return await context.prisma.travelDays.update({
    where: { id: args.id },
    data: {
      daynumber: args.input.daynumber,
      date: args.input.date,
      description: args.input.description,
      travelId: args.input.travelId,
    },
  });
}

async function deleteTravelDay(parent, args, context, info) {
  return await context.prisma.travelDays.delete({
    where: { id: args.id },
  });
}

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.user.create({
    data: { ...args, password },
  });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user,
  };
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  });
  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

module.exports = {
  addTravel,
  addTravelDay,
  updateTravel,
  updateTravelDay,
  deleteTravel,
  deleteTravelDay,
  signup,
  login,
};
