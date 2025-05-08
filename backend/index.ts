import * as dotenv from "dotenv";
import * as express from "express";
import * as cors from "cors";
import * as http from "http";

import { startApolloServer } from "./schema";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);

startApolloServer(app, httpServer);