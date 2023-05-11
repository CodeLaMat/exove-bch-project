import { Request, Response } from "express";
import ResponsePack from "../models/responses";
import SurveyPack from "../models/surveyPack";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors";

const addResponse = async (req: Request, res: Response) => {
  const employeeTakingSurveyId = req.user.userId.toString();
  const { surveyPack: surveyPackId } = req.body;

  const surveyPack = await SurveyPack.findOne({ _id: surveyPackId });
  if (!surveyPack) {
    throw new NotFoundError(`No surveyPack with id: ${surveyPackId}`);
  }

  const isValidEmployee = surveyPack.employeesTakingSurvey.find(
    (employee) => employee.employee.toString() === employeeTakingSurveyId
  );
  if (!isValidEmployee) {
    throw new UnauthorizedError("Your not authorized to take this survey");
  }
  const alreadySubmitted = await ResponsePack.findOne({
    surveyPack: surveyPackId,
    employeeTakingSurveyId: req.user.userId,
  });
  if (alreadySubmitted) {
    throw new BadRequestError(
      "Already submitted an Evaluation for this employee"
    );
  }
  req.body.employeeTakingSurveyId = req.user.userId;
  const responsePack = await ResponsePack.create(req.body);
  res.status(StatusCodes.CREATED).json({ responsePack });
};

const getAllResponses = async (req: Request, res: Response) => {
  const responsePack = await ResponsePack.find({}).populate({
    path: "personBeingSurveyedId",
    select: "totalResponses",
  });
  res.status(StatusCodes.OK).json({ responsePack });
};
const getSingleResponse = async (req: Request, res: Response) => {
  const { id: responsePackId } = req.params;
  const responsePack = await ResponsePack.findOne({ _id: responsePackId });
  if (!responsePack) {
    throw new NotFoundError(`No responsePack with id ${responsePackId}`);
  }
  res.status(StatusCodes.OK).json({ responsePack });
};
const updateResponse = async (req: Request, res: Response) => {
  const { id: responsePackId } = req.params;
  const { totalResponses } = req.body;
  const responsePack = await ResponsePack.findOne({ _id: responsePackId });
  if (!responsePack) {
    throw new NotFoundError(`No responsePack with id ${responsePackId}`);
  }

  responsePack.totalResponses = totalResponses;

  await responsePack.save();
  res.status(StatusCodes.OK).json({ responsePack });
};

const showStats = async (req: Request, res: Response) => {
  let stats = await ResponsePack.aggregate([]);
  res.send("show stats");
};

export {
  addResponse,
  getAllResponses,
  getSingleResponse,
  updateResponse,
  showStats,
};
export {
  addResponse,
  getAllResponses,
  getSingleResponse,
  updateResponse,
  showStats,
};
