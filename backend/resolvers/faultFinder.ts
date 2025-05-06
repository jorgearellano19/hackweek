import { retrieveAndGenerate } from "../bedrock/client";

export type FaultFinderArgs = {
  input: string;
};

export async function faultFinder({ input }: FaultFinderArgs) {
  const response = await retrieveAndGenerate(input);

  return response.output?.text;
}
