import express from "express";
import { authenticate } from "../middleware/auth";
import { getFilmStatus } from "../controller/me";

const router = express();

router.get("/movie-status/:filmId", authenticate, getFilmStatus);

export default router;
