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
      id
    }
  }
`;

export const UPDATETRAVEL_MUTATION = gql`
  mutation UpdateTravel($id: ID!, $input: UpdateTravelInput!) {
    updateTravel(id: $id, input: $input) {
      title
      description
    }
  }
`;
export const UPDATETRAVELDAY_MUTATION = gql`
  mutation UpdateTravelDay($id: ID!, $input: UpdateTravelDayInput!) {
    updateTravelDay(id: $id, input: $input) {
      daynumber
      description
      id
      travelId
    }
  }
`;

export const DELETETRAVEL_MUTATION = gql`
  mutation DeleteTravel($id: ID!) {
    deleteTravel(id: $id) {
      deleted
    }
  }
`;

export const DELETETRAVELDAY_MUTATION = gql`
  mutation DeleteTravelDay($id: ID!) {
    deleteTravelDay(id: $id) {
      deleted
    }
  }
`;
