import {
  BedrockAgentRuntimeClient,
  RetrieveAndGenerateCommand,
} from "@aws-sdk/client-bedrock-agent-runtime";
import * as dotenv from "dotenv";

import { generateTemplate } from "./promptTemplates";
dotenv.config();

const SECRET_KEY: string = process.env.SECRET_KEY || "";
const ACCESS_KEY: string = process.env.ACCESS_KEY || "";

const client = new BedrockAgentRuntimeClient({ 
  region: process.env.AWS_REGION,
  credentials: {
    secretAccessKey: SECRET_KEY,
    accessKeyId: ACCESS_KEY,
  }
});

export async function retrieveAndGenerate(textInput: string, sessionId?: string) {
  console.log(process.env);
  const command = new RetrieveAndGenerateCommand({
    input: { text: textInput },
    retrieveAndGenerateConfiguration: {
      type: "KNOWLEDGE_BASE",
      knowledgeBaseConfiguration: {
        knowledgeBaseId: process.env.KNOWLEDGE_BASE_ID,
        modelArn: process.env.MODEL_ARN,
        retrievalConfiguration: {
          vectorSearchConfiguration: {
            numberOfResults: 10
          }
        },
        generationConfiguration: {
          promptTemplate: {
            textPromptTemplate: generateTemplate(process.env.STAGE_URL as string),
          }
        }
      },
    },
    sessionId,
  });
  console.log(process.env);
  console.log(await client.config.credentials());
  return await client.send(command);
}
