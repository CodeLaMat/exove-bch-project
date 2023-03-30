import { NextFunction, Request, Response } from "express";

const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res
    .status(500)
    .json({ msg: "something went wrong, please try again" });
};

export default errorHandler;
