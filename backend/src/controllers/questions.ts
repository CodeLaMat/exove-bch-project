import { Request, Response } from "express";
import Questions from "../models/questions";

const addQuestion = async (req: Request, res: Response) => {
  try {
    const question = new Questions({
      question: req.body.question,
      category: req.body.category,
      description: req.body.description,
      QuestionType: req.body.questionType,
      // add any other necessary fields here
   });

    console.log("question: ", question);
    res.status(200).json({
      status: 200,
      message: "question saved successfully" + question,
    })

    // if (await question.save()) { 
    //   res.status(200).json({
    //     status: 200,
    //     message: "question saved successfully" + question,
    //   })
    // } 
  } catch (err: any) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
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
