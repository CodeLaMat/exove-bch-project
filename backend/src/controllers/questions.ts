import { Request, Response } from "express";
import Questions from "../models/questions";

const addQuestion = async (req: Request, res: Response) => {
  res.send("add Question");
};
const deleteQuestion = async (req: Request, res: Response) => {
  res.send("delete Question");
};
const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await Questions.find();
    res.status(200).json(questions);
  } catch (err: any) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }

  // res.send("gel all Questions");
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
