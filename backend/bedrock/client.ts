import {
  BedrockAgentRuntimeClient,
  RetrieveAndGenerateCommand,
} from "@aws-sdk/client-bedrock-agent-runtime";

const client = new BedrockAgentRuntimeClient({ region: process.env.AWS_REGION });

export async function retrieveAndGenerate(textInput: string, sessionId?: string) {
  const command = new RetrieveAndGenerateCommand({
    input: { text: textInput },
    retrieveAndGenerateConfiguration: {
      type: "KNOWLEDGE_BASE",
      knowledgeBaseConfiguration: {
        knowledgeBaseId: process.env.KNOWLEDGE_BASE_ID,
        modelArn: process.env.MODEL_ARN,
      },
    },
    sessionId,
  });

  return await client.send(command);
}
