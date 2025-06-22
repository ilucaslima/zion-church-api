import bcrypt from "bcryptjs";

export const hashedPassword = async (password: string) => {
  const pass = await bcrypt.hash(password, 10);
  return pass.toString();
};
