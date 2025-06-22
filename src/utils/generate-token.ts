import jwt, { Secret } from "jsonwebtoken";

export function generateToken(params: { userId: string }) {
  const secret: Secret = process.env.SECRET as string;
  return jwt.sign(params, secret, {
    expiresIn: 60 * 60 * 24, // 24 hours
  });
}
