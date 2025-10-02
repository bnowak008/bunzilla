import { describe, expect, it } from "vitest";
import { greet } from "../src";

describe("Utility", () => {
  it("should greet correctly", () => {
    expect(greet("World")).toBe("Hello, World!");
  });
});
