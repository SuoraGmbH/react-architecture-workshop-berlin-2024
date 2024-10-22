import { mockServer } from "./mocks/server";
import { beforeAll, afterEach, afterAll } from "vitest";
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";

beforeAll(() => {
  mockServer.listen({ onUnhandledRequest: "error" });
});
afterEach(() => mockServer.resetHandlers());
afterEach(() => cleanup());
afterAll(() => mockServer.close());
