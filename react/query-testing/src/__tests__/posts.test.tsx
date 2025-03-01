import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PostComponent } from "../posts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const renderWithQueryClient = (ui: React.ReactElement) => {
  const testQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );
};

describe("Testing query without mock server", () => {
  test("Renders post", async () => {
    const screen = renderWithQueryClient(<PostComponent postId={1} />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.getByText(
          /sunt aut facere repellat provident occaecati excepturi optio reprehenderit/i
        )
      ).toBeInTheDocument();
    });
  });
});

const server = setupServer(
  http.get("https://jsonplaceholder.typicode.com/posts/1", () => {
    return HttpResponse.json({
      postId: 1,
      id: 1,
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    });
  })
);

describe("Testing query with mock server", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("Renders post", async () => {
    const screen = renderWithQueryClient(<PostComponent postId={1} />);
    expect(await screen.findByText(/Loading/i)).toBeInTheDocument();
    expect(
      await screen.findByText(
        /sunt aut facere repellat provident occaecati excepturi optio reprehenderit/i
      )
    ).toBeInTheDocument();
  });
});
