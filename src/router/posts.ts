import express from "express";

import authMiddleware from "../middleware/auth";

import * as post from "../controllers/posts";

import { upload } from "../services/s3";

export const router = express.Router();

router.post("/", authMiddleware, upload.single("image"), (req, res, next) => {
  post.create(req, res, next);
});

router.get("/like/:id", authMiddleware, (req, res, next) => {
  post.like(req, res, next);
});

router.get("/unlike/:id", authMiddleware, (req, res, next) => {
  post.unlike(req, res, next);
});

router.get("/", (req, res, next) => {
  post.viewAll(req, res, next);
});

router.post(
  "/comment/:id",
  upload.single("image"),
  authMiddleware,
  (req, res, next) => {
    post.comment(req, res, next);
  }
);
