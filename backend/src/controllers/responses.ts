import { Request, Response } from "express";
import Responses from "../models/responses";

const addResponse = async (req: Request, res: Response) => {
  res.send("add Response");
};
const getAllResponses = async (req: Request, res: Response) => {
  res.send("gel all Responses");
};
const updateResponses = async (req: Request, res: Response) => {
  res.send("update all Responses");
};
const showStats = async (req: Request, res: Response) => {
  res.send("show stats");
};

export { addResponse, getAllResponses, updateResponses, showStats };
