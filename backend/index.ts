import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { startStandaloneServer } from '@apollo/server/standalone';
import * as dotenv from "dotenv";
import * as express from "express";
import * as cors from 'cors';
import * as http from "http";

import resolvers from "./resolvers/resolvers";
import { typeDefs } from "./schema";
dotenv.config();

const PORT = process.env.PORT as unknown as number || 3000;
const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);

// Set up Apollo Server
export const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});



startStandaloneServer(server, {
  listen: { port: PORT },
}).then(({ url }) => console.log(`🚀  Server ready at ${url}`));
