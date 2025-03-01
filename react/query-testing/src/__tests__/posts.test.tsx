import { describe, expect, test } from "vitest";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PostComponent } from "../posts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

describe("App", () => {
  test("renders learn react link", async () => {
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
