import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "É Necessário refazer o login" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(404).json({ error: "Token mal formatado!" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: "Token mal formatado!" });
  }

  const secret: Secret = process.env.SECRET as string;

  jwt.verify(token, secret, (err: any, decoded: unknown) => {
    if (err) return res.status(404).json({ error: "Usuário não existe!" });

    res.locals.userId = (decoded as JwtPayload).userId;

    return next();
  });
};

export default authMiddleware;
