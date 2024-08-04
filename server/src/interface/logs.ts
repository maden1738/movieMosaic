export interface ILogs {
     filmId: number;
     likeStatus: boolean;
     rating?: number;
     content?: string;
}

export interface GetLogsQuery {
     size?: number;
     page?: number;
}
