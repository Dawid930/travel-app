const { v4: uuid } = require("uuid");

exports.Mutation = {
  addTravel: (parent, { input }, { db }) => {
    const {
      title,
      country,
      location,
      description,
      author,
      travelCompanions,
      rating,
    } = input;

    const newTravel = {
      id: uuid(),
      title,
      country,
      location,
      description,
      author,
      travelCompanions,
      rating,
    };

    db.travels.push(newTravel)

    return newTravel
  },
};
