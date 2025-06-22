import { Prisma } from "@prisma/client";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      message: "Erro de validação",
      errors: error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(400).json({ message: "Erro no Prisma" });
    return;
  }

  if (error instanceof Error) {
    res.status(400).json({ message: "Erro na API" });
    return;
  }

  res.status(500).json({ message: "Erro interno do servidor" });
  return;
};
