import { gql } from "@apollo/client";

export const ADDTRAVEL_MUTATION = gql`
  mutation AddTravel($input: AddTravelInput!) {
    addTravel(input: $input) {
        title
        description
    }
    }
`;
export const ADDTRAVELDAY_MUTATION = gql`
  mutation AddTravelDay($input: AddTravelDayInput!) {
    addTravelDay(input: $input) {
        daynumber
        description
        travelId
    }
    }
`;

