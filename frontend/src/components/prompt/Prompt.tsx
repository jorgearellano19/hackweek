import { useState } from "react";

import { Button, Card, Field, Group, Input, InputGroup } from "@chakra-ui/react";
import { GiBrain } from "react-icons/gi";
import { useForm } from "react-hook-form";
import { FaArrowTurnUp } from "react-icons/fa6";

import PromptFeed from "./PromptFeed";
import type { FeedElement } from "./Prompt.types";
import usePrompt from "./usePrompt";

import "./Prompt.scss";

type FormValues = {
  textInput: string;
  sessionId?: string;
};

const Prompt = () => {
  const [feed, setFeed] = useState<FeedElement[]>([]);
  const lastUserMessage = feed.toReversed().find((msg) => msg.fromUser)?.value ?? "";

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<FormValues>();

  const onFinderResponse = (msg: string) => {
    const botMsg = {
      value: msg,
    } satisfies FeedElement;
    setFeed((prev) => [...prev, botMsg]);
  };

  const onSubmit = handleSubmit((data) => {
    const userMessage = {
      value: data.textInput,
      fromUser: true,
    } satisfies FeedElement;

    setFeed((prev) => [...prev, userMessage]);
    reset();
    setFocus("textInput");
  });

  const { isLoading } = usePrompt({
    lastUserMessage,
    lastElement: feed.at(-1),
    onResponse: onFinderResponse,
  });

  const resultFeed = (
    isLoading ? [...feed, { value: "", isLoading }] : feed
  ) satisfies FeedElement[];

  return (
    <Card.Root size="lg">
      <Card.Body gap={2}>
        <PromptFeed feed={resultFeed} />
      </Card.Body>
      <Card.Footer>
        <form onSubmit={onSubmit} className="prompt-form" autoComplete="off">
          <Field.Root invalid={!!errors.textInput}>
            <Group attached w="full">
              <InputGroup startElement={<GiBrain size="1.25rem" />}>
                <Input
                  placeholder="Ask me anything..."
                  {...register("textInput")}
                  variant="flushed"
                  autoFocus
                />
              </InputGroup>
              <Button bg="bg.subtle" variant="ghost" type="submit">
                <FaArrowTurnUp className="prompt-input-icon" />
              </Button>
            </Group>
          </Field.Root>
        </form>
      </Card.Footer>
    </Card.Root>
  );
};

export default Prompt;
