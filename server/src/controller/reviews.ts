import { NextFunction, Request, Response } from "express";
import * as ReviewsService from ".././service/reviews";
import HttpStatusCodes from "http-status-codes";

export async function getReviewById(
     req: Request,
     res: Response,
     next: NextFunction
) {
     const { id } = req.params;
     try {
          const data = await ReviewsService.getReviewDetail(+id);

          res.status(HttpStatusCodes.OK).json({
               data,
          });
     } catch (error) {
          next(error);
     }
}
