import { gql } from "@apollo/client";

export const ADDTRAVEL_MUTATION = gql`
  mutation AddTravel($input: AddTravelInput!) {
    addTravel(input: $input) {
        title
        description
    }
    }
  
`;

