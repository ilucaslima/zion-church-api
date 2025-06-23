import { Post, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { getIO } from "../utils/socket";

const prisma = new PrismaClient();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { content } = req.body;
    const userId = res.locals.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    const post = await prisma.post.create({
      data: {
        content,
        authorId: userId,
        authorName: user.name,
        ...(req?.file && {
          image: (req?.file as any).location,
          imageName: (req?.file as any).originalname,
        }),
      },
    });

    const io = getIO();
    io.emit("new-post", post);

    return res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export const like = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = res.locals.userId;

    const post = await prisma.post.findUnique({
      where: { id: id },
    });

    if (!post) {
      return res.status(404).json({ message: "Post não encontrado!" });
    }

    if (post.likedBy.includes(userId)) {
      return res.status(400).json({ message: "Você já curtiu este post!" });
    }

    const updatedPost = await prisma.post.update({
      where: { id: id },
      data: { likes: { increment: 1 }, likedBy: { push: userId } },
    });

    const io = getIO();
    io.emit("post-liked", {
      postId: id,
      likes: updatedPost.likes,
      likedBy: updatedPost.likedBy,
      userId,
    });

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const viewAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await prisma.post.findMany();

    const postsWithComments = await Promise.all(
      posts.map(async (post: Post) => {
        const comments = await prisma.comment.findMany({
          where: { postId: post.id },
        });

        return {
          ...post,
          comments,
        };
      })
    );

    return res.status(200).json(postsWithComments.reverse());
  } catch (error) {
    next(error);
  }
};

export const comment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = res.locals.userId;

    const post = await prisma.post.findUnique({
      where: { id: id },
    });

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    if (!post) {
      return res.status(404).json({ message: "Post não encontrado!" });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        postId: id,
        authorId: userId,
        name: user.name,
        ...(req?.file && {
          image: (req?.file as any).location,
          imageName: (req?.file as any).originalname,
        }),
      },
    });

    const io = getIO();
    io.emit("new-comment", {
      postId: id,
      comment,
      userId,
    });

    return res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

export const unlike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = res.locals.userId;

    const post = await prisma.post.findUnique({
      where: { id: id },
    });

    if (!post) {
      return res.status(404).json({ message: "Post não encontrado!" });
    }

    if (!post.likedBy.includes(userId)) {
      return res.status(400).json({ message: "Você não curtiu este post!" });
    }

    const updatedPost = await prisma.post.update({
      where: { id: id },
      data: { likes: { decrement: 1 } },
    });

    await prisma.post.update({
      where: { id: id },
      data: { likedBy: { set: post.likedBy.filter((id) => id !== userId) } },
    });

    const io = getIO();
    io.emit("post-unliked", {
      postId: id,
      likes: updatedPost.likes,
      userId,
    });

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
