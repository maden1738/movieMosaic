import express from "express";
import { getReviewById } from "../controller/reviews";

const router = express();

router.get("/:id", getReviewById);

export default router;
