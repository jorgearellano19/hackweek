import { retrieveAndGenerate } from "../bedrock/client";

export type FaultFinderArgs = {
  textInput: string;
  sessionId?: string;
};

export type FinderResponse = {
  textOutput?: string;
  sessionId?: string;
  score?: number;
};

export async function faultFinder({
  textInput,
  sessionId,
}: FaultFinderArgs): Promise<FinderResponse> {
  const response = await retrieveAndGenerate(textInput, sessionId);

  return {
    textOutput: response.output?.text,
    sessionId: response.sessionId,
  };
}
