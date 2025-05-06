import { BedrockAgentRuntimeClient, RetrieveAndGenerateCommand } from "@aws-sdk/client-bedrock-agent-runtime"
const client = new BedrockAgentRuntimeClient({ region: "us-east-2" });


export async function retrieveAndGenerate(text: string) {
  const command = new RetrieveAndGenerateCommand({
    input: { text },
    retrieveAndGenerateConfiguration: {
      type: "KNOWLEDGE_BASE",
      knowledgeBaseConfiguration: {
        knowledgeBaseId: process.env.KNOWLEDGE_BASE_ID,
        modelArn: process.env.MODEL_ARN
      }
    }
  })

  return await client.send(command);
}
