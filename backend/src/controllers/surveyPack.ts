import { Request, Response } from "express";
import SurveyPack from "../models/surveyPack";
import User from "../models/user";
import { StatusCodes } from "http-status-codes";
import { NotFoundError, UnauthorizedError } from "../errors";
import { checkPermissions } from "../util";

const createSurveyPack = async (req: Request, res: Response) => {
  const surveyPack = await SurveyPack.create(req.body);
  checkPermissions(
    req.user as { role: User["role"]; userId: User["_id"] },
    surveyPack._id
  );
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
  res.status(StatusCodes.OK).json({ surveyPack });
};

const updateSurveyPack = async (req: Request, res: Response) => {
  const surveyPackId = req.params.id;
  const userId = req.user?.userId;

  const surveyPack = await SurveyPack.findById(surveyPackId);
  if (!surveyPack) {
    throw new NotFoundError(`No surveyPack with id ${surveyPack}`);
  }

  const userRole = req.user?.role;
  if (userRole === "hr") {
    const updatedSurveyPack = await SurveyPack.findByIdAndUpdate(
      surveyPackId,
      req.body,
      { new: true }
    );
    return res.status(StatusCodes.OK).json(updatedSurveyPack);
  } else {
    const { surveyors } = req.body;

    // Check if the user is a surveyor in the surveyPack
    const userIsSurveyor = surveyPack.surveyors.some(
      (surveyor) => surveyor.staff.toString() === userId
    );

    if (!userIsSurveyor) {
      throw new UnauthorizedError(
        "You are not authorized to update this survey pack"
      );
    }

    surveyPack.surveyors = surveyors;
    const updatedSurveyPack = await surveyPack.save();

    return res.status(StatusCodes.OK).json(updatedSurveyPack);
  }
};

const deleteSurveyPack = async (req: Request, res: Response) => {
  const surveyPackId = req.params.id;
  const userRole = req.user?.role;
  if (userRole === "hr") {
    const surveyPack = await SurveyPack.findByIdAndRemove(surveyPackId);
    if (!surveyPack) {
      throw new NotFoundError(`No surveyPack with id ${surveyPack}`);
    }
    return res.status(StatusCodes.OK).json(surveyPack);
  } else {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: "You are not authorized to delete this survey pack" });
  }
};

const getSurveyors = async (req: Request, res: Response) => {
  res.send("get surveyors");
};
const updateSurveyors = async (req: Request, res: Response) => {
  res.send("update surveyors");
};
const deleteSurveyors = async (req: Request, res: Response) => {
  res.send("delete surveyors");
};

export {
  createSurveyPack,
  getSurveyPack,
  updateSurveyPack,
  deleteSurveyPack,
  getSurveyors,
  updateSurveyors,
  deleteSurveyors,
};
