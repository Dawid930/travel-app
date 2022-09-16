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

    db.travels.push(newTravel);

    return newTravel;
  },

  addTravelDay: (parent, { input }, { db }) => {
    const { daynumber, date, description, author, travelId } = input;

    const newTravelDay = {
      id: uuid(),
      daynumber,
      date,
      description,
      author,
      travelId,
    };

    db.travelDays.push(newTravelDay);

    return newTravelDay;
  },
};
