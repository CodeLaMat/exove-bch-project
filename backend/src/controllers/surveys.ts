import { Request, Response } from "express";
import * as mongoose from "mongoose";
import survey from "../models/surveys";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors";
import { checkPermissions } from "../util";

const addSurvey = async (req: Request, res: Response) => {
  try {
    const newSurvey = new survey({
      surveyName: req.body.surveyName,
      description: req.body.description,
      questions: req.body.questions,
    });

    if (await newSurvey.save()) {
      res.status(200).json({
        status: 200,
        message: "question saved successfully" + survey,
      });
    }
  } catch (err: any) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

const deleteSurvey = async (req: Request, res: Response) => {
  const {
    params: { id: surveyId },
  } = req;

  console.log("surveyId-delete", surveyId);

  try {
    const result = await survey.deleteOne({ _id: surveyId });
    return res.status(200).send("Survey deleted successfully");
  } catch (error) {
    return res.status(500).send("Error deleting survey");
  };
}

const getAllSurveys = async (req: Request, res: Response) => {
  try {
    const getSurveys = await survey.find();
    res.status(200).json(getSurveys);
  } catch (err: any) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

const getOneSurvey = async (req: Request, res: Response) => {
  const {
    params: { id: surveyId },
  } = req;
  const surVey = await survey.findOne({ _id: surveyId });
  if (!surVey) {
    throw new NotFoundError(`No survey with id ${surveyId}`);
  }
  res.status(StatusCodes.OK).json({ surVey });
};

const updateSurvey = async (req: Request, res: Response) => {
  res.send("update one surveys");
};

export { addSurvey, deleteSurvey, getAllSurveys, getOneSurvey, updateSurvey };
