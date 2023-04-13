import jwt from "jsonwebtoken";
import { Response } from "express";
import { User } from "../types/dataTypes";

interface Payload {
  userId: string;
  email: string;
  role: string;
}
interface TokenData {
  token: string;
}

interface AttachCookies {
  res: Response;
  user: Payload;
}

export const createJWT = ({ payload }: { payload: Payload }): string => {
  const token = jwt.sign(payload, `${process.env.JWT_SECRET}`, {
    expiresIn: `${process.env.JWT_LIFETIME}`,
  });
  return token;
};

export const isTokenValid = ({ token }: { token: string }): TokenData =>
  jwt.verify(token, `${process.env.JWT_SECRET}`) as TokenData;

export const attachCookiesToResponse = ({ res, user }: AttachCookies) => {
  const token = createJWT({ payload: user });
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};
