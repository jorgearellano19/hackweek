import type { FeedElement } from "./Prompt.types";

export const mockedFeed = [
  {
    value: "Can you tell me something?",
    fromUser: true,
  },
  {
    value:
      "Sure! Did you know that the name Canary Islands is not a reference to a birds (Canary)? It is actually a reference to Dogs (Insula Canaria, meaning 'Island of the Dogs) [See more](https://en.wikipedia.org/wiki/Canary_Islands).",
  },
  {
    value: "Wow! I did not knew that!",
    fromUser: true,
  },
] satisfies FeedElement[];
