import { Router } from "express";
import { router as usersRouter } from "./users";
import { router as postsRouter } from "./posts";

const router = Router();

router.use("/users", usersRouter);
router.use("/posts", postsRouter);

export default router;
