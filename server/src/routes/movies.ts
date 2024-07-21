import express from "express";
import { validateReqQuery } from "../middleware/validator";
import { GetMoviesQuerySchema } from "../schema/movies";
import { getMovies, getMoviesById } from "../controller/movies";

const router = express();

router.get("/", validateReqQuery(GetMoviesQuerySchema), getMovies);
router.get("/:id", getMoviesById);

export default router;
