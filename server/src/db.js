const travels = [
  {
    title: "My journey to Dream islands",
    country: "Dream islands",
    location: "Vulkan city",
    description: "This was the best place ever. Nice beaches etc...",
    author: "David",
    travelCompanions: 2,
    rating: 3,
    id: "1",
    dateRange: {
      start: "2022-08-23",
      end: "2022-08-30"
    },
  },
];

const travelDays = [
  {
    id: "1",
    daynumber: 1,
    date: "2022-06-05",
    description: "We had a nice day on the beach",
    author: "David",
    travelId: "1",
  },
];

exports.db = {
  travels,
  travelDays,
};
