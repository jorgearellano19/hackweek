import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import resolvers from "./resolvers/resolvers";
import { Application } from "express";
import { Server } from "node:http";

// TODO: Use codegen if there is time.
const typeDefs = gql`
  # See resolvers/faultFinder -> FinderResponse
  type BotResponse {
    textOutput: String
    sessionId: String
    score: Float
  }

  type Query {
    hello: String
    faultFinder(textInput: String!, sessionId: String): BotResponse!
  }
`;

export const startApolloServer = async (app: Application, httpServer: Server) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });
}