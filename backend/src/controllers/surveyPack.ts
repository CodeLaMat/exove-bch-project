import { Request, Response } from "express";
import SurveyPack from "../models/surveyPack";
import User from "../models/user";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors";
import { checkPermissions } from "../util";

const createSurveyPack = async (req: Request, res: Response) => {
  const surveyPack = await SurveyPack.create(req.body);
  if (!surveyPack) {
    throw new BadRequestError("Please complete the form");
  }
  res.status(StatusCodes.CREATED).json({ surveyPack });
};

const getSurveyPack = async (req: Request, res: Response) => {
  const {
    params: { id: surveyPackId },
  } = req;
  const surveyPack = await SurveyPack.findOne({ _id: surveyPackId });
  if (!surveyPack) {
    throw new NotFoundError(`No surveyPack with id ${surveyPackId}`);
  }
  checkPermissions(req.user, surveyPackId);
  res.status(StatusCodes.OK).json({ surveyPack });
};

const updateSurveyPack = async (req: Request, res: Response) => {
  const {
    params: { id: surveyPackId },
    user: { role },
  } = req;
  const surveyPack = await SurveyPack.findById({ _id: surveyPackId });

  if (!surveyPack) {
    throw new NotFoundError(`No product with id : ${surveyPackId}`);
  }
  if (role === "hr") {
    await SurveyPack.findByIdAndUpdate(surveyPackId, req.body, {
      new: true,
      runValidators: true,
    });
    return res
      .status(StatusCodes.OK)
      .json({ msg: "surveyPack successfully updated" });
  } else {
    const { surveyors } = req.body;
    surveyPack.employeesTakingSurvey = surveyors;
    await surveyPack.save();
    return res
      .status(StatusCodes.OK)
      .json({ msg: "EmployeesTakingSurvey updated successfully" });
  }
};

const deleteSurveyPack = async (req: Request, res: Response) => {
  const {
    params: { id: surveyPackId },
  } = req;
  const surveyPack = await SurveyPack.findByIdAndRemove({ _id: surveyPackId });

  if (!surveyPack) {
    throw new NotFoundError(`No product with id : ${surveyPackId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Success! SurveyPack removed." });
};

const getSurveyors = async (req: Request, res: Response) => {
  const {
    params: { id: surveyPackId },
  } = req;
  const surveyPack = await SurveyPack.findById({ _id: surveyPackId }).populate(
    "employeesTakingSurvey"
  );
  if (!surveyPack) {
    throw new NotFoundError(`surveyPack ${surveyPackId} not found`);
  }
  const surveyors = surveyPack.employeesTakingSurvey;
  return res.status(StatusCodes.OK).json({ surveyors });
};
const updateSurveyors = async (req: Request, res: Response) => {
  const {
    params: { id: surveyPackId },
    body: { employeesTakingSurvey },
  } = req;

  const surveyPack = await SurveyPack.findById({ _id: surveyPackId });
  if (!surveyPack) {
    throw new NotFoundError(`surveyPack ${surveyPackId} not found`);
  }

  surveyPack.employeesTakingSurvey = employeesTakingSurvey;
  await surveyPack.save();
  return res
    .status(StatusCodes.OK)
    .json({ msg: "EmployeesTakingSurvey updated successfully" });
};

export {
  createSurveyPack,
  getSurveyPack,
  updateSurveyPack,
  deleteSurveyPack,
  getSurveyors,
  updateSurveyors,
};
