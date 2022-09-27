const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Travel = require("./resolvers/Travel");
const fs = require("fs");
const path = require("path");

const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");

const { getUserId } = require("./utils");

const resolvers = {
  Query,
  Mutation,
  Travel,
};

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
});

server.listen().then(({ url }) => {
  console.log("server is running at " + url);
});
