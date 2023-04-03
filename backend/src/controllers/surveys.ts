import { Request, Response } from "express";
import Survey from "../models/surveys";

const addSurvey = async (req: Request, res: Response) => {
  try {
    const survey = new Survey({
      question: req.body.name,
      description: req.body.description,
      questions: req.body.questions,
      // add any other necessary fields here
   });

    console.log("survey: ", survey);
    res.status(200).json({
      status: 200,
      message: "question saved successfully" + survey,
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
const deleteSurvey = async (req: Request, res: Response) => {
  res.send("delete Question");
};
const getAllSurveys = async (req: Request, res: Response) => {
  try {
    // res.send("getting all surveys");
    res.send("get one Question");
  } catch (err: any) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }

  // res.send("gel all Questions");
};
const getOneSurvey = async (req: Request, res: Response) => {
  res.send("get one Question");
};
const updateSurvey = async (req: Request, res: Response) => {
  res.send("update one Question");
};

export {
    addSurvey,
    deleteSurvey,
    getAllSurveys,
    getOneSurvey,
    updateSurvey,
};
