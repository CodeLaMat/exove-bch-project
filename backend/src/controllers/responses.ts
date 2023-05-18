import { Request, Response } from "express";
import ResponsePack from "../models/responses";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors";
import User from "../models/user";

const addResponse = async (req: Request, res: Response) => {
  const { id: responsePackId } = req.params;
  const {
    name: [employeeName],
  } = req.user;
  const { allResponses } = req.body;

  const responsePack = await ResponsePack.findOne({ _id: responsePackId });
  if (!responsePack) {
    throw new NotFoundError(`No responsePack with id: ${responsePackId}`);
  }
  const employeeTakingSurvey = responsePack.totalResponses.find(
    async (response) => {
      const employee = await User.findById(response.employeeTakingSurvey);
      return employee?.displayName === employeeName;
    }
  );
  if (!employeeTakingSurvey) {
    throw new UnauthorizedError(
      `User ${employeeName} is not authorized to add responses to this survey`
    );
  }

  for (const { question, response } of allResponses) {
    const currentEmployeeResponse = employeeTakingSurvey.allResponses.find(
      (r) => r.question._id?.toString() === question
    );

    if (currentEmployeeResponse && currentEmployeeResponse.response !== "") {
      throw new BadRequestError(
        `User ${employeeName} has already submitted a response for this question`
      );
    }

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
    .status(StatusCodes.OK)
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
