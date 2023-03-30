import { Request, Response } from "express";
import User from "../models/user";

const login = async (req: Request, res: Response) => {
  res.send("user login ");
};
const register = async (req: Request, res: Response) => {
  res.send("user register");
};
const getAllUsers = async (req: Request, res: Response) => {
  res.send("get All users");
};
const getOneUser = async (req: Request, res: Response) => {
  res.send("show stats");
};
const updateUser = async (req: Request, res: Response) => {
  res.send("show stats");
};
const deleteUser = async (req: Request, res: Response) => {
  res.send("show stats");
};

export { login, register, getAllUsers, getOneUser, updateUser, deleteUser };
