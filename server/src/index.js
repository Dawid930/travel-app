const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const fs = require("fs");
const path = require("path");

const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");

const { getUserId } = require("./utils");

const resolvers = {
  Query,
  Mutation,
};

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: ({ req }) => {
    const userId = req?.headers?.authorization ? getUserId(req) : null
    return {
      ...req,
      prisma,
      userId,
      isAuth: () => {if (!userId) throw Error("Not authorized, please log in!")}
    };
  },
});


server.listen().then(({ url }) => {
  console.log("server is running at " + url);
});
