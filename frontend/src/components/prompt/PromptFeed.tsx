import { Text } from "@chakra-ui/react";
import type { FeedElement } from "./Prompt.types";

import "./PromptFeed.scss";
import Linkify from "../ui/Linkyfy";

type PromptFeedProps = {
  feed: FeedElement[];
};

const PromptFeed = ({ feed }: PromptFeedProps) => {
  return (
    <div className="feed-scrollable">
      <div className="feed-container">
        {feed.map((e) => {
          const elementClassName = `feed-element${e.fromUser ? " from-user" : ""}`;
          return (
            <Text textStyle="md" className={elementClassName}>
              {e.fromUser ? e.value : <Linkify text={e.value} />}
            </Text>
          );
        })}
      </div>
    </div>
  );
};

export default PromptFeed;
