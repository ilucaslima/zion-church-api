import { PrismaClient } from "@prisma/client";
import { userSchemaValidation } from "../schema/users";
import { NextFunction, Request, Response } from "express";
import { hashedPassword } from "../utils/hashed-password";
import { generateToken } from "../utils/generate-token";

import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cpf, password, name } = userSchemaValidation.parse(req.body);

    const userAlreadyExists = await prisma.user.findUnique({
      where: { cpf },
    });

    if (userAlreadyExists) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    const passHashed = await hashedPassword(password);

    const user = await prisma.user.create({
      data: { cpf, password: passHashed, name: name || "" },
    });

    const token = generateToken({ userId: user.id });

    return res.status(201).json({
      user: {
        ...user,
        password: undefined,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cpf, password } = userSchemaValidation.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { cpf },
    });

    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Senha inválida" });
    }

    const token = generateToken({ userId: user.id });

    return res.status(200).json({
      user: {
        ...user,
        password: undefined,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};
