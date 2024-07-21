import { NextFunction, Response } from "express";
import { IRequest } from "../interface/auth";

export function getWatchedList(
     req: IRequest,
     res: Response,
     next: NextFunction
) {
     const userId = req.user?.id!;
}
