import { generateToken } from "../../utils/generate-token";

// Set up environment variable for testing
process.env.SECRET = "test-secret-key";

describe("generateToken", () => {
  it("should generate a token", () => {
    const token = generateToken({ userId: "123" });
    expect(token).toBeDefined();
  });

  it("should return a string", () => {
    const token = generateToken({ userId: "123" });
    expect(typeof token).toBe("string");
  });
});
