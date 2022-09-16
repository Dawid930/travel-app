const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    travels: [Travel!]!
    travel(id: ID!): Travel
  }

  type Mutation {
    addTravel(input: AddTravelInput!): Travel!
    addTravelDay(input: AddTravelDayInput!): TravelDays!
    updateTravel(id: ID!, input: UpdateTravelInput!): Travel
    updateTravelDay(id: ID!, input: UpdateTravelDayInput!): TravelDays
  }

  type Travel {
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

  input UpdateTravelInput {
    title: String
    country: String
    location: String
    description: String
    author: String
    travelCompanions: Int
    rating: Int
  }

  input AddTravelDayInput {
    daynumber: Int!
    date: String!
    description: String!
    author: String!
    travelId: String!
  }

  input UpdateTravelDayInput {
    daynumber: Int
    date: String
    description: String
    author: String
    travelId: String
  }
`;