import { gql } from "@apollo/client";

export const TRAVELS_QUERY = gql`
query TravelQuery {
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
export const TRAVELDETAILS_QUERY = gql`
query TravelDetailsQuery {
  travel {
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

export const USER_QUERY = gql`
query UserQuery {
  user{
    name
    email
    id
  }
}
`
