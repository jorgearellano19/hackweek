import { Button, Card, Field, Group, Input, InputGroup } from "@chakra-ui/react";
import { GiBrain } from "react-icons/gi";
import { useForm } from "react-hook-form";

import "./Prompt.scss";
import { FaArrowTurnUp } from "react-icons/fa6";
import PromptFeed from "./PromptFeed";
import { mockedFeed } from "./Prompt.mock";

type FormValues = {
  textInput: string;
  sessionId?: string;
};

const Prompt = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <Card.Root size="lg">
      <Card.Body gap={2}>
        <PromptFeed feed={mockedFeed} />
      </Card.Body>
      <Card.Footer>
        <form onSubmit={onSubmit} className="prompt-form">
          <Field.Root invalid={!!errors.textInput}>
            <Group attached w="full">
              <InputGroup startElement={<GiBrain size="1.25rem" />}>
                <Input
                  placeholder="Ask me anything..."
                  {...register("textInput")}
                  variant="subtle"
                />
              </InputGroup>
              <Button bg="bg.subtle" variant="surface" type="submit">
                <FaArrowTurnUp />
              </Button>
            </Group>
          </Field.Root>
        </form>
      </Card.Footer>
    </Card.Root>
  );
};

export default Prompt;
