const API_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async <TResponse = unknown>(
  query: string,
  variables?: Record<string, any>
): Promise<TResponse> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`);
  }

  const json = await response.json();

  if (json.errors) {
    console.error("GraphQL errors:", json.errors);
    throw new Error("GraphQL returned errors");
  }

  return json.data as TResponse;
};
