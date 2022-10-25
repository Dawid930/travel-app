export interface Travel {
  title: string,
  country: string,
  location: string,
  dateRange: {
    start: Date,
    end: Date,
  },
  description: string,
  travelCompanions: number
  rating: number
}

export interface Travels {
  travels: Travel[];
}
