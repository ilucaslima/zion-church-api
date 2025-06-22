import express from "express";

import authMiddleware from "../middleware/auth";

import * as post from "../controllers/posts";

export const router = express.Router();

router.post("/", authMiddleware, (req, res, next) => {
  post.create(req, res, next);
});

router.get("/like/:id", authMiddleware, (req, res, next) => {
  post.like(req, res, next);
});

router.get("/", (req, res, next) => {
  post.viewAll(req, res, next);
});

router.post("/comment/:id", authMiddleware, (req, res, next) => {
  post.comment(req, res, next);
});
