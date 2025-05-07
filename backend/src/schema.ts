import { gql } from "apollo-server-express";

export const typeDefs = gql`
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