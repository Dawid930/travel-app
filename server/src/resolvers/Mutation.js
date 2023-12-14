const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("../utils");

async function addTravel(parent, args, { userId, prisma, isAuth }, info) {
  isAuth();
  return await prisma.travel.create({
    include: { dateRange: true, addedBy: true },
    data: {
      title: args.input.title,
      country: args.input.country,
      location: args.input.location,
      description: args.input.description,
      travelCompanions: args.input.travelCompanions,
      rating: args.input.rating,
      addedBy: { connect: { id: userId } },
      dateRange: {
        create: {
          start: args.input.dateRange.start,
          end: args.input.dateRange.end,
        },
      },
    },
  });
}

async function updateTravel(parent, args, { prisma, isAuth }, info) {
  isAuth();
  return await prisma.travel.update({
    where: { id: args.id },
    include: { dateRange: true },
    data: {
      title: args.input.title,
      country: args.input.country,
      location: args.input.location,
      description: args.input.description,
      travelCompanions: args.input.travelCompanions,
      rating: args.input.rating,
      dateRange: {
        create: {
          start: args.input.dateRange.start,
          end: args.input.dateRange.end,
        },
      },
    },
  });
}

async function deleteTravel(parent, args, { prisma, isAuth }, info) {
  isAuth();
  const result = await prisma.travel.delete({
    where: { id: args.id },
  });
  return { deleted: !!result };
}

async function addTravelDay(parent, args, { userId, prisma, isAuth }, info) {
  isAuth();
  return await prisma.travelDays.create({
    include: { addedBy: true },
    data: {
      daynumber: args.input.daynumber,
      description: args.input.description,
      travelId: args.input.travelId,
      addedById: userId,
    },
  });
}

async function updateTravelDay(parent, args, { prisma, isAuth }, info) {
  isAuth();
  return await prisma.travelDays.update({
    where: { id: args.id },
    data: {
      daynumber: args.input.daynumber,
      date: args.input.date,
      description: args.input.description,
      travelId: args.input.travelId,
    },
  });
}

async function deleteTravelDay(parent, args, { prisma, isAuth }, info) {
  isAuth();
  const result = await prisma.travelDays.delete({
    where: { id: args.id },
  });
  return { deleted: !!result };
}

async function signup(parent, args, { prisma }, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await prisma.user.create({
    data: { ...args, password },
  });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user,
  };
}

async function login(parent, args, { prisma }, info) {
  const user = await prisma.user.findUnique({
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
