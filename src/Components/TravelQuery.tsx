import { gql } from "@apollo/client";

export const TRAVELS_QUERY = gql`
{
  travels {
    title
    country
    location
    description
    travelCompanions
    rating
    id
    dateRange {
      start
      end
    }
  }
}
`
export const TRAVEL_QUERY = gql`
{
  travels {
    title
    country
    location
    description
    travelCompanions
    rating
    id
    dateRange {
      start
      end
    }
  }
}
`

