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
query TravelDetailsQuery ($id: ID!) {
  travel (id: $id) {
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
    travelDays {
      daynumber
      description
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
