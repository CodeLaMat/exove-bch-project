import { Request, Response } from "express";
import SurveyPack from "../models/surveyPack";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";
import User from "../models/user";
import { sendUserEmail } from "../util";

const getAllSurveyPacks = async (req: Request, res: Response) => {
  const surveyPacks = await SurveyPack.find();
  if (!surveyPacks) {
    throw new NotFoundError(`No surveyPacks found`);
  }
  res.status(StatusCodes.OK).json({ surveyPacks });
};

const createSurveyPack = async (req: Request, res: Response) => {
  const surveyPack = await SurveyPack.create(req.body);
  if (!surveyPack) {
    throw new BadRequestError("Please complete the form");
  }
  const personBeingSurveyed = await User.findById(
    surveyPack.personBeingSurveyed
  );
  if (!personBeingSurveyed) {
    throw new NotFoundError("personBeingSurveyed not found");
  }
  try {
    await sendUserEmail({
      name: personBeingSurveyed.displayName as string,
      email: personBeingSurveyed.email as string,
      senderEmail: req.user.email,
      senderName: req.user.name,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email: ", error);
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
  res.status(StatusCodes.OK).json({ surveyPack });
};

const updateSurveyPack = async (req: Request, res: Response) => {
  const {
    params: { id: surveyPackId },
  } = req;
  const surveyPack = await SurveyPack.findByIdAndUpdate(
    { _id: surveyPackId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!surveyPack) {
    throw new NotFoundError(`No surveyPack with id ${surveyPackId}`);
  }
  if (surveyPack.hrapproved === true) {
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "surveyPack successfully updated", surveyPack: surveyPack });
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
  const employeesTakingSurvey = surveyPack.employeesTakingSurvey;
  return res.status(StatusCodes.OK).json({ employeesTakingSurvey });
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
  return res.status(StatusCodes.OK).json({
    msg: "EmployeesTakingSurvey updated successfully",
    employeesTakingSurvey: surveyPack.employeesTakingSurvey,
  });
};

const getManagerApproval = async (req: Request, res: Response) => {
  const {
    params: { id: surveyPackId },
  } = req;
  const surveyPack = await SurveyPack.findById(
    { _id: surveyPackId },
    { employeesTakingSurvey: 1, manager: 1, managerapproved: 1 }
  );

  if (!surveyPack) {
    throw new NotFoundError(`No product with id : ${surveyPackId}`);
  }
  res.status(StatusCodes.OK).json({ surveyPack });
};
const updateManagerApproval = async (req: Request, res: Response) => {
  const {
    params: { id: surveyPackId },
    body: { employeesTakingSurvey, manager, managerapproved },
  } = req;

  const surveyPack = await SurveyPack.findById({ _id: surveyPackId });
  if (!surveyPack) {
    throw new NotFoundError(`surveyPack ${surveyPackId} not found`);
  }
  surveyPack.employeesTakingSurvey = employeesTakingSurvey;
  surveyPack.manager = manager;
  surveyPack.managerapproved = managerapproved;

  await surveyPack.save();

  res.status(StatusCodes.ACCEPTED).json({
    msg: "manager approval successful updated",
    employeesTakingSurvey: surveyPack.employeesTakingSurvey,
    managerapproved: surveyPack.managerapproved,
    manager: surveyPack.manager,
  });
};

export {
  getAllSurveyPacks,
  createSurveyPack,
  getSurveyPack,
  updateSurveyPack,
  deleteSurveyPack,
  getSurveyors,
  updateSurveyors,
  getManagerApproval,
  updateManagerApproval,
};
