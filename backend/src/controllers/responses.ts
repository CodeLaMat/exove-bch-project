import { Request, Response } from "express";
import ResponsePack from "../models/responses";
import SurveyPack from "../models/surveyPack";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors";
import User from "../models/user";

const addResponse = async (req: Request, res: Response) => {
  const { id: responsePackId } = req.params;
  const { name: employeeName } = req.user;
  const { allResponses } = req.body;

  // check if user is listed as an 'employeeTakingSurvey' in the 'responosePack'
  const responsePack = await ResponsePack.findOne({ _id: responsePackId });
  if (!responsePack) {
    throw new NotFoundError(`No responsePack with id: ${responsePackId}`);
  }
  let employeeTakingSurvey;
  for (const response of responsePack.totalResponses) {
    const employee = await User.findById(response.employeeTakingSurvey);
    if (employee?.displayName === employeeName) {
      employeeTakingSurvey = response;
      break;
    }
  }
  if (!employeeTakingSurvey) {
    throw new UnauthorizedError(
      `User ${employeeName} is not authorized to add responses to this survey`
    );
  }
  // update the 'totalResponses' object with the new responses

  for (const { question, response } of allResponses) {
    // Find the 'allResponses' object corresponding to the current question
    const currentEmployeeResponse = employeeTakingSurvey.allResponses.find(
      (response) => response.question._id?.toString() === question
    );
    if (currentEmployeeResponse && currentEmployeeResponse.response !== "") {
      throw new BadRequestError(
        `User ${employeeName} has already submitted a response for this question`
      );
    }
    // Update the 'allResponses' object with the new response
    if (currentEmployeeResponse) {
      currentEmployeeResponse.response = response;
    } else {
      employeeTakingSurvey.allResponses.push({
        question: { _id: question },
        response,
      });
    }
  }

  await responsePack.save();

  return res
    .status(StatusCodes.CREATED)
    .json({ msg: "Response added successfully", responsePack });
};

const getAllResponses = async (req: Request, res: Response) => {
  const responsePack = await ResponsePack.find({});
  res.status(StatusCodes.OK).json({ responsePack, count: responsePack.length });
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
  const responsePack = await ResponsePack.findOne({ _id: responsePackId });
  if (!responsePack) {
    throw new NotFoundError(`No surveyPack with id: ${responsePackId}`);
  }
  const updatedResponsePack = await ResponsePack.findOneAndUpdate(
    { _id: responsePackId },
    req.body,
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.CREATED).json({ updatedResponsePack });
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
