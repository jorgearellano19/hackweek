import { ApolloServer, gql } from "apollo-server";
import resolvers from "./resolvers/resolvers";

// TODO: Use codegen if there is time.
const typeDefs = gql`
  type Query {
    hello: String
    faultFinder(input: String!): String!
  }
`;

export const server = new ApolloServer({
  typeDefs,
  resolvers,
});
