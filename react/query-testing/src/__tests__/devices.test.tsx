import { afterEach, describe, expect, test } from "vitest";
import "@testing-library/jest-dom";

import { renderWithQueryClient } from "./utils";
import { DevicesComponent } from "../devices";

const original = globalThis.navigator.mediaDevices?.enumerateDevices;

describe("Testing query without API call by overriding function", () => {
  afterEach(() => {
    Object.defineProperty(globalThis.navigator, "mediaDevices", {
      value: {
        enumerateDevices: original,
      },
    });
  });

  test("Renders Devices", async () => {
    Object.defineProperty(globalThis.navigator, "mediaDevices", {
      configurable: true,
      value: {
        enumerateDevices: async () => {
          return [
            {
              deviceId: "default",
              groupId: "default",
              kind: "audioinput",
              label: "Default",
            },
            {
              deviceId: "default",
              groupId: "default",
              kind: "videoinput",
              label: "Default",
            },
          ];
        },
      },
    });

    const screen = renderWithQueryClient(<DevicesComponent />);
    expect(await screen.findByText(/Loading/i)).toBeInTheDocument();
    expect(await screen.findByText(/2 Available/i)).toBeInTheDocument();
  });
});

describe("Seeding the query cache", () => {
  test("Renders Devices", async () => {
    const screen = renderWithQueryClient(<DevicesComponent />, [
      [
        ["devices"],
        [
          {
            deviceId: "default",
            groupId: "default",
            kind: "audioinput",
            label: "Default",
          },
          {
            deviceId: "default",
            groupId: "default",
            kind: "videoinput",
            label: "Default",
          },
        ],
      ],
    ]);

    expect(await screen.findByText(/2 Available/i)).toBeInTheDocument();
  });
});

// Other not recommended approach can be mocking the useQuery function
