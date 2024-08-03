export interface ILogs {
  filmId: string;
  likeStatus: boolean;
  content?: string;
  rating?: number;
}

export interface ILogsResponse {
  name: string;
  reviewId: string;
  avatarUrl: string;
  filmId: string;
  title: string;
  posterUrl: string;
  likeStatus: boolean;
  content: string | null;
  rating: number | null;
  createdAt: string;
  userId: string;
}
