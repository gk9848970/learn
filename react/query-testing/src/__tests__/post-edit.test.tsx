import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { PostEditComponent } from "../posts";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { renderWithQueryClient } from "./utils";
import { fireEvent } from "@testing-library/react";

const server = setupServer(
  http.get("https://jsonplaceholder.typicode.com/posts/1", () => {
    return HttpResponse.json({
      postId: 1,
      id: 1,
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    });
  }),

  http.patch("https://jsonplaceholder.typicode.com/posts/1", () => {
    return HttpResponse.json({
      title: "New Title",
    });
  })
);

describe("Mutation with mock server", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("Renders post", async () => {
    const screen = renderWithQueryClient(<PostEditComponent postId={1} />);

    expect(await screen.findByText(/Loading/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/sunt aut facere repellat/i)
    ).toBeInTheDocument();

    const input = screen.getByRole("textbox");
    const button = screen.getByText("Edit");
    fireEvent.change(input, { target: { value: "New Title" } });

    server.use(
      http.get("https://jsonplaceholder.typicode.com/posts/1", () => {
        return HttpResponse.json({
          postId: 1,
          id: 1,
          title: "New Title",
          body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        });
      })
    );

    fireEvent.click(button);
    expect(await screen.findByText(/New Title/i)).toBeInTheDocument();
  });
});
