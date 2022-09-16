const { ApolloServer } = require("apollo-server");
const {typeDefs} = require("./schema")
const {Query} = require("./resolvers/Query")
const {Mutation} = require("./resolvers/Mutation")
const {db} = require("./db")



const resolvers = {
    Query,
    Mutation
}


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
      db
    }
  });
  
  server.listen().then(({ url }) => {
    console.log("server is running at " + url);
  });