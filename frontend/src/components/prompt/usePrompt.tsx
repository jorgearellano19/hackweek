import { useFinder } from "@/api/useFinder";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import type { FeedElement } from "./Prompt.types";

type usePromptProps = {
  lastUserMessage: string;
  lastElement?: FeedElement;
  onResponse: (msg: string) => void;
};

const usePrompt = ({ lastUserMessage, lastElement, onResponse }: usePromptProps) => {
  const navigate = useNavigate({ from: "/" });
  const sessionId = useSearch({ strict: false, select: (search) => search.sessionId });

  const finderDisabled = !lastElement?.fromUser;

  const { data, isLoading } = useFinder({ textInput: lastUserMessage, sessionId }, finderDisabled);

  useEffect(() => {
    const responseMsg = data?.faultFinder?.textOutput;
    if (!responseMsg) return;

    onResponse(responseMsg);

    navigate({
      search: {
        sessionId: data.faultFinder.sessionId,
      },
    });
  }, [data]);

  return {
    data,
    isLoading,
  };
};

export default usePrompt;
