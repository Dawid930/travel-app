export interface Travel {
  title: string;
  country: string;
  location: string;
  author: string;
  description: string;
  date: string;
  travelCompanions: string;
  id: number;
}

export interface Travels {
  travels: Travel[];
}
