import express from "express";
import { validateReqBody, validateReqQuery } from "../middleware/validator";
import { GetMoviesQuerySchema } from "../schema/movies";
import {
     createMovie,
     createReviews,
     getMovies,
     getMoviesById,
     getReviews,
     updateReview,
} from "../controller/movies";
import { authenticate, authorize } from "../middleware/auth";
import { CreateReviewSchema, getReviewSchema } from "../schema/reviews";
import { upload } from "../middleware/multer";

const router = express();

router.get("/", validateReqQuery(GetMoviesQuerySchema), getMovies);
router.get("/:id", getMoviesById);

router.post(
     "/",
     upload.fields([
          { name: "poster", maxCount: 1 },
          { name: "backdrop", maxCount: 1 },
     ]),
     authenticate,
     authorize("admin"),
     createMovie
);

//posting reviews
router.post(
     "/:id/reviews",
     validateReqBody(CreateReviewSchema),
     authenticate,
     createReviews
);
router.get("/:id/reviews", validateReqQuery(getReviewSchema), getReviews);
router.put("/:id/reviews/:reviewId", authenticate, updateReview);

export default router;
