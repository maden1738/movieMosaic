export interface ILogs {
  filmId: string;
  likeStatus: boolean;
  content?: string;
  rating?: number;
}

export interface ILogsResponse {
  name: string;
  avatarUrl: string;
  id: string;
  title: string;
  posterUrl: string;
  likeStatus: boolean;
  content: string | null;
  rating: number | null;
}
