import { useFinder } from "@/api/useFinder";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";

type usePromptProps = {
  lastUserMessage: string;
  onResponse: (msg: string) => void;
};

const usePrompt = ({ lastUserMessage, onResponse }: usePromptProps) => {
  const navigate = useNavigate({ from: "/" });
  const sessionId = useSearch({ strict: false, select: (search) => search.sessionId });

  const { data, isLoading } = useFinder({ textInput: lastUserMessage, sessionId });

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
