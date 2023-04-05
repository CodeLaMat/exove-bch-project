import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors";

interface JwtPayload {
  _id: string;
  email: string;
  role: string;
}

interface AuthRequest extends Request {
  user?: { userId: string; email: string; role: string };
}

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication Invalid");
  }

  const token = authHeader && authHeader.split(" ")[1];
  try {
    const decoded: JwtPayload = jwt.verify(
      token,
      `${process.env.JWT_SECRET}`
    ) as JwtPayload;
    req.user = {
      userId: decoded._id,
      email: decoded.email,
      role: decoded.role,
    };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export default auth;
