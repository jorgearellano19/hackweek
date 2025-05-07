import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "./apiFetch";

const QUERY_STALE_TIME = 300;

const FINDER_QUERY = `
  query FaultFinder($textInput: String!, $sessionId: String) {
    faultFinder(textInput: $textInput, sessionId: $sessionId) {
      textOutput
      sessionId
    }
  }
`;

type FinderResponse = {
  faultFinder: {
    textOutput: string;
    sessionId: string;
  };
};

type FaultFinderVariables = {
  textInput: string;
  sessionId?: string;
};

export const useFinder = (variables: FaultFinderVariables, disabled?: boolean) => {
  return useQuery({
    queryKey: ["finder", variables],
    queryFn: () => apiFetch<FinderResponse>(FINDER_QUERY, variables),
    enabled: !disabled && !!variables.textInput,
    staleTime: QUERY_STALE_TIME,
  });
};
