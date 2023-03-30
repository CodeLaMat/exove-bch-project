import { Request, Response } from "express";
import Question from "../models/questions";

const addQuestion = async (req: Request, res: Response) => {
  res.send("add Question");
};
const deleteQuestion = async (req: Request, res: Response) => {
  res.send("delete Question");
};
const getAllQuestions = async (req: Request, res: Response) => {
  res.send("gel all Questions");
};
const getOneQuestion = async (req: Request, res: Response) => {
  res.send("get one Question");
};
const updateQuestion = async (req: Request, res: Response) => {
  res.send("update one Question");
};

export {
  addQuestion,
  deleteQuestion,
  getAllQuestions,
  getOneQuestion,
  updateQuestion,
};
