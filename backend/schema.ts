import { ApolloServer, gql } from "apollo-server";
import resolvers from "./resolvers/resolvers";

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

export const server = new ApolloServer({
  typeDefs,
  resolvers,
});
