const { ApolloServer } = require("apollo-server");
//const { typeDefs } = require("./schema");
const { Query } = require("./resolvers/Query");
const { Mutation } = require("./resolvers/Mutation");
const { db } = require("./db");
const { Travel } = require("./resolvers/Travel");
const fs = require("fs");
const path = require("path");

const resolvers = {
  Query,
  Mutation,
  Travel,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: {
    db,
  },
});

server.listen().then(({ url }) => {
  console.log("server is running at " + url);
});
