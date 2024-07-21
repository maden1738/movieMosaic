import authRouter from "./auth";
import moviesRouter from "./movies";
import express from "express";

const router = express();

router.use("/auth", authRouter);
router.use("/movies", moviesRouter);
router.use("/lists");

export default router;
