import { Request, Response } from "express";
import User from "../models/user";
import {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} from "../errors";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

interface JwtPayload {
  _id: string;
  email: string;
  role: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

const login = async (req: Request, res: Response) => {
  const { email, password }: LoginRequestBody = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide your name and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const payload: JwtPayload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(payload, `${process.env.JWT_SECRET}`, {
    expiresIn: "2d",
  });
  res.status(StatusCodes.OK).json({ user: { name: user.displayName }, token });
};

const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find().sort("role");
  res.status(StatusCodes.OK).json({ users, count: users.length });
};
const getOneUser = async (req: Request, res: Response) => {
  const {
    params: { id: userId },
  } = req;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new NotFoundError(`No user with id ${userId}`);
  }
  res.send("show stats");
};
// const register = async (req: Request, res: Response) => {
//   res.send("user register");
// };
// const updateUser = async (req: Request, res: Response) => {
//   res.send("show stats");
// };
// const deleteUser = async (req: Request, res: Response) => {
//   res.send("show stats");
// };

export { login, getAllUsers, getOneUser };
