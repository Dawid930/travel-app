import { gql } from "@apollo/client";

export const TRAVELS_QUERY = gql`
  query TravelQuery($showDetails: Boolean! = false, $userId: ID!) {
    travels(userId: $userId) {
      title
      country
      location @include(if: $showDetails)
      description @include(if: $showDetails)
      travelCompanions @include(if: $showDetails)
      rating @include(if: $showDetails)
      id
      dateRange {
        start
        end
      }
      addedBy {
        id
        name
        email
      }
    }
  }
`;

export const TRAVELDETAILS_QUERY = gql`
  query TravelDetailsQuery($id: ID!) {
    travel(id: $id) {
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
        id
        daynumber
        description
        travelId
      }
    }
  }
`;

export const TRAVELDAY_QUERY = gql`
  query TravelDayQuery($id: ID!) {
    travelDay(id: $id) {
      id
      daynumber
      description
      travelId
    }
  }
`;

export const USER_QUERY = gql`
  query UserQuery {
    user {
      name
      email
      id
    }
  }
`;
