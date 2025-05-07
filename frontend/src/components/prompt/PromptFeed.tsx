import { Spinner, Text } from "@chakra-ui/react";
import type { FeedElement } from "./Prompt.types";

import "./PromptFeed.scss";
import Linkify from "../ui/Linkyfy";
import { useEffect, useRef } from "react";

type PromptFeedProps = {
  feed: FeedElement[];
};

const PromptFeed = ({ feed }: PromptFeedProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [feed]);

  return (
    <div className="feed-scrollable" ref={scrollRef}>
      <div className="feed-container">
        {feed.map((e) => {
          const elementClassName = `feed-element${e.fromUser ? " from-user" : ""}`;
          return (
            <Text textStyle="md" className={elementClassName} key={e.timestamp ?? Math.random()}>
              {e.fromUser ? (
                e.value
              ) : e.isLoading ? (
                <Spinner size="sm" />
              ) : (
                <Linkify text={e.value} />
              )}
            </Text>
          );
        })}
      </div>
    </div>
  );
};

export default PromptFeed;
