import express from "express";

import * as user from "../controllers/users";

export const router = express.Router();

router.post("/", (req, res, next) => {
  user.create(req, res, next);
});

router.post("/auth", (req, res, next) => {
  user.login(req, res, next);
});
