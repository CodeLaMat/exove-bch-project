import { Request, Response } from "express";
import User from "../models/user";
import { UserRoles } from "../types/dataTypes";
import {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} from "../errors";
import { StatusCodes } from "http-status-codes";
//import jwt from "jsonwebtoken";
//import bcrypt from "bcryptjs";
import {
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
} from "../util";

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
  // const isMatch = await bcrypt.compare(password, user.password);
  // if (!isMatch) {
  //   throw new UnauthenticatedError("Invalid Credentials");
  // }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  // const tokenUser = {
  //   userId: user._id,
  //   name: user.displayName as string,
  //   email: user.email,
  //   role: user.role,
  // };
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  // const payload: JwtPayload = {
  //   _id: user._id,
  //   email: user.email,
  //   role: user.role,
  // };
  // const token = jwt.sign(payload, `${process.env.JWT_SECRET}`, {
  //   expiresIn: `${process.env.JWT_LIFETIME}`,
  // });

  // const oneDay = 1000 * 60 * 60 * 24;
  // res.cookie("token", token, {
  //   httpOnly: true,
  //   expires: new Date(Date.now() + oneDay),
  //   secure: process.env.NODE_ENV === "production",
  //   signed: true,
  // });

  res.status(StatusCodes.OK).json({
    user: tokenUser,
  });
};

const logout = async (req: Request, res: Response) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  return res.status(StatusCodes.OK).json({ msg: "user logout" });
};

// const getAllUsers = async (req: Request, res: Response) => {
//   const users = await User.find({}).sort("role");
//   res.status(StatusCodes.OK).json({ users, count: users.length });
// };

interface QueryParams {
  search?: string;
  role?: UserRoles;
  sort?: "asc" | "desc";
}

const getAllUsers = async (req: Request, res: Response) => {
  const queryParams: QueryParams = req.query;
  const search = queryParams.search || "";

  const query = {
    $or: [
      { firstName: new RegExp(search, "i") },
      { surname: new RegExp(search, "i") },
    ],
  };

  let result = User.find(query);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const users = await result;

  const totalUsers = await User.countDocuments(query);
  const numOfPages = Math.ceil(totalUsers / limit);

  res.status(StatusCodes.OK).json({ users, totalUsers, numOfPages });
};

const getOneUser = async (req: Request, res: Response) => {
  const {
    params: { id: userId },
  } = req;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new NotFoundError(`No user with id ${userId}`);
  }
  checkPermissions(req.user as { role: string; userId: string }, user._id);
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ user: req.user });
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

export { login, getAllUsers, getOneUser, logout, showCurrentUser };
