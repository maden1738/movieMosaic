import authRouter from "./auth";
import moviesRouter from "./movies";
import userRouter from "./user";
import meRouter from "./me";
import reviewRouter from "./reviews";
import express from "express";

const router = express();

router.use("/auth", authRouter);
router.use("/movies", moviesRouter);
router.use("/users", userRouter);
router.use("/me", meRouter);
router.use("/reviews", reviewRouter);

export default router;
