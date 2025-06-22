import { hashedPassword } from "../../utils/hashed-password";

describe("hashPassword", () => {
  it("should hash a password", async () => {
    const password = "123456";
    const hashed = await hashedPassword(password);
    expect(hashed).not.toBe(password);
  });

  it("should return a string", async () => {
    const password = "123456";
    const hashed = await hashedPassword(password);
    expect(typeof hashed).toBe("string");
  });
});
