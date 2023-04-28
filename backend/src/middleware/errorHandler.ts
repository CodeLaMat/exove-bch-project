import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

interface CustomError {
  statusCode: number;
  msg: string;
}

const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  let customError: CustomError = {
    // set default
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandlerMiddleware;
