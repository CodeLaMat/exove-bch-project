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

    // console.log("survey: ", survey);
    // res.status(200).json({
    //   status: 200,
    //   message: "survey saved successfully" + survey,
    // })

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
  res.send("delete Question");
};
const getAllSurveys = async (req: Request, res: Response) => {
  try {
    const getSurveys = await survey.find();
    console.log("getSurvey", getSurveys);
    res.status(200).json(getSurveys);
  } catch (err: any) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }

  // res.send("gel all surveys");
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
