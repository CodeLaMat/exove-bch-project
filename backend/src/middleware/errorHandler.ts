import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "../errors";

const isCustomAPIError = (err: any): err is CustomAPIError => {
  return err instanceof CustomAPIError;
};

const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isCustomAPIError(err) && err.statusCode !== undefined) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "Something went wrong, please try again" });
};

export default errorHandlerMiddleware;
