import { getStatus } from "./likedMovies";
import { getStatus as getWatchedStatus } from "./watchList";

export async function getFilmStatus(filmId: string, userId: string) {
     const likedStatus = await getStatus(filmId, userId);
     const watchedStatus = await getWatchedStatus(filmId, userId, true);
     const watchListStatus = await getWatchedStatus(filmId, userId, false);

     return { likedStatus, watchedStatus, watchListStatus };
}
