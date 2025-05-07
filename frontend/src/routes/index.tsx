import App from "@/App";
import { createFileRoute } from "@tanstack/react-router";

export type IndexSearch = {
  sessionId?: string;
};

export const Route = createFileRoute("/")({
  component: Index,
  validateSearch: (search: Record<string, unknown>): IndexSearch => ({
    sessionId: (search.sessionId as string) || undefined,
  }),
});

function Index() {
  return <App />;
}
