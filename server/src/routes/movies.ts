import express from "express";
import { validateReqBody, validateReqQuery } from "../middleware/validator";
import { GetMoviesQuerySchema } from "../schema/movies";
import {
     createReviews,
     getMovies,
     getMoviesById,
     getReviews,
     updateReview,
} from "../controller/movies";
import { authenticate } from "../middleware/auth";
import { CreateReviewSchema } from "../schema/reviews";

const router = express();

router.get("/", validateReqQuery(GetMoviesQuerySchema), getMovies);
router.get("/:id", getMoviesById);

//posting reviews
router.post(
     "/:id/reviews",
     validateReqBody(CreateReviewSchema),
     authenticate,
     createReviews
);
router.get("/:id/reviews", getReviews);
router.put("/:id/reviews/:reviewId", authenticate, updateReview);

export default router;
