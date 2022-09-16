const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    travels: [Travels!]!
    travelDays: [TravelDays!]!
  }

  type Mutation {
    addTravel(input: AddTravelInput!): Travels!
  }

  type Travels {
    id: ID!
    title: String!
    country: String!
    location: String!
    description: String!
    author: String!
    travelCompanions: Int
    rating: Int
    travelDays: [TravelDays]
  }

  type TravelDays {
    id: ID!
    daynumber: Int!
    date: String!
    description: String!
    author: String!
    
  }

  input AddTravelInput {
    title: String!
    country: String!
    location: String!
    description: String!
    author: String!
    travelCompanions: Int!
    rating: Int!
  }

  input AddTravelDayInput {
    daynumber: Int!
    date: String!
    description: String!
    author: String!
    travelId: String!
  }
`;
