export interface IFilm {
  id: string;
  filmId: string;
  title: string;
  posterUrl: string;
  overview: string;
  releaseDate: string;
  backdropUrl: string;
  ratingCount: string;
  trailer: string;
  rating: number;
}

export interface IPagination {
  page: number;
  totalPages: number;
}
