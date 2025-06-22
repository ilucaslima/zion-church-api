import { userSchemaValidation } from "../../schema/users";

describe("userSchemaValidation", () => {
  it("should validate a user", () => {
    const user = {
      email: "john.doe@example.com",
      password: "1234567890s",
    };

    const result = userSchemaValidation.safeParse(user);
    expect(result.success).toBe(true);
  });

  it("should return an error if the password is invalid", () => {
    const user = {
      email: "john.doe@example.com",
      password: "123456",
    };

    const result = userSchemaValidation.safeParse(user);
    expect(result.success).toBe(false);
  });

  it("should return an error if the email is invalid", () => {
    const user = {
      email: "john.doe",
      password: "123456312312",
    };

    const result = userSchemaValidation.safeParse(user);
    expect(result.success).toBe(false);
  });
});
