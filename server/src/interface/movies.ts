export interface GetMoviesQuery {
     q?: string;
     size?: number;
     page?: number;
     sortBy?: string;
}

export interface IMovie {
     title: string;
     posterUrl: string;
     backdropUrl: string;
     overview: string;
     releaseDate: string;
     popularity: number;
     trailer: string;
}

export interface IFilmImage {
     poster: string;
     backdrop: string;
}
