import { gql } from "@apollo/client";

export const ADDTRAVEL_MUTATION = gql`
  mutation addTravel($input: AddTravelInput!) {
    addTravel(input: $input) {
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
`;
