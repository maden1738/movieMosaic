export interface Review {
     content?: string;
     rating: number;
}

export interface GetReviewsQuery {
     size?: number;
     page?: number;
     sortBy?: string;
}
