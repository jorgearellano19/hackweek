import {
  BedrockAgentRuntimeClient,
  RetrieveAndGenerateCommand,
} from "@aws-sdk/client-bedrock-agent-runtime";
import { generateTemplate } from "./promptTemplates";

const client = new BedrockAgentRuntimeClient({ region: process.env.AWS_REGION });

export async function retrieveAndGenerate(textInput: string, sessionId?: string) {
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

  return await client.send(command);
}
