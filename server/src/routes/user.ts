import express from "express";
import { authenticate } from "../middleware/auth";
import {
     addToWatchList,
     addToWatchedList,
     deleteFromWatchList,
     deleteFromWatchedList,
     deleteLikedMovies,
     followUser,
     getFollowers,
     getFollowing,
     getLikedMovies,
     getWatchList,
     getWatchedList,
     likeMovie,
     unfollowUser,
} from "../controller/user";
import { validateReqBody } from "../middleware/validator";
import { AddMoviesToListSchema } from "../schema/movies";

const router = express();

router.get("/:id/watched", authenticate, getWatchedList);
router.post(
     "/:id/watched",
     validateReqBody(AddMoviesToListSchema),
     authenticate,
     addToWatchedList
);
router.delete("/:id/watched/:movieId", authenticate, deleteFromWatchedList);

//add a film to watchlist
router.post(
     "/:id/watchlist",
     validateReqBody(AddMoviesToListSchema),
     authenticate,
     addToWatchList
);

// get watchlist of a user
router.get("/:id/watchlist", authenticate, getWatchList);
// remove a movie from watchlist
router.delete("/:id/watchlist/:movieId", authenticate, deleteFromWatchList);

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
