import express from "express";
import { authenticate } from "../middleware/auth";
import {
     addToWatchList,
     deleteFromWatchList,
     deleteLikedMovies,
     followUser,
     getFollowers,
     getFollowing,
     getLikedMovies,
     getWatchList,
     likeMovie,
     getWatchedMovies,
     unfollowUser,
     addWatchedMovies,
     deleteFromWatchedList,
} from "../controller/user";
import { validateReqBody } from "../middleware/validator";
import { AddMoviesToWatchListSchema } from "../schema/movies";
import { getCurrentUserDetails } from "../controller/user";

const router = express();

//add a film to watchlist
router.post(
     "/:id/watchlist",
     validateReqBody(AddMoviesToWatchListSchema),
     authenticate,
     addToWatchList
);

router.get("/me", authenticate, getCurrentUserDetails);

// get watchlist of a user
router.get("/:id/watchlist", authenticate, getWatchList);
// remove a movie from watchlist
router.delete("/:id/watchlist/:movieId", authenticate, deleteFromWatchList);

// get watched movies of a user
router.get("/:id/watched", authenticate, getWatchedMovies);
router.delete("/:id/watched/:movieId", authenticate, deleteFromWatchedList);
router.post(
     "/:id/watched",
     validateReqBody(AddMoviesToWatchListSchema),
     authenticate,
     addWatchedMovies
);

// add to liked movies
router.post("/:id/likes", authenticate, likeMovie);
//get liked movies of a user
router.get("/:id/likes", authenticate, getLikedMovies);
//remove liked movies of a user
router.delete("/:id/likes/:filmId", authenticate, deleteLikedMovies);

// follow a user:
router.post("/:id/follow", authenticate, followUser);
//unfollow a user
router.delete("/:id/follow", authenticate, unfollowUser);
//get followers of a user
router.get("/:id/followers", getFollowers);
// get users that a user is following
router.get("/:id/follow", getFollowing);

export default router;
