import authRouter from "./auth";
import moviesRouter from "./movies";
import userRouter from "./user";
import express from "express";

const router = express();

router.use("/auth", authRouter);
router.use("/movies", moviesRouter);
router.use("/users", userRouter);

export default router;
