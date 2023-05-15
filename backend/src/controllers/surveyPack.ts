import { Request, Response } from "express";
import SurveyPack from "../models/surveyPack";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";
import User from "../models/user";
import {
  sendUserEmail,
  sendHrApprovalEmail,
  sendParticipantEmail,
} from "../util";

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
  const { id: surveyPackId } = req.params;

  const surveyPack = await SurveyPack.findById(surveyPackId);
  if (!surveyPack) {
    throw new NotFoundError(`No surveyPack with id ${surveyPackId}`);
  }
  const updatedSurveyPack = await SurveyPack.findByIdAndUpdate(
    surveyPackId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (
    updatedSurveyPack!.hrapproved === true &&
    updatedSurveyPack!.employeesTakingSurvey.length === 6 &&
    updatedSurveyPack!.employeesTakingSurvey.every((status) => {
      return status.acceptanceStatus === "Approved";
    })
  ) {
    const [surveyors, reviewee] = await Promise.all([
      User.find({
        _id: {
          $in: updatedSurveyPack!.employeesTakingSurvey.map(
            (status) => status.employee
          ),
        },
      }),
      User.findById(updatedSurveyPack!.personBeingSurveyed),
    ]);
    for (const surveyor of surveyors) {
      try {
        if (reviewee) {
          await sendHrApprovalEmail({
            receiverEmail: surveyor.email as string,
            receiverName: surveyor.displayName as string,
            employeeName: reviewee.displayName as string,
            senderEmail: req.user.email,
            senderName: req.user.name,
          });
        }
      } catch (error) {
        console.error(`Error sending email to ${surveyor.email}`, error);
      }
    }
  }
  res.status(StatusCodes.OK).json({
    msg: "surveyPack successfully updated",
    surveyPack: updatedSurveyPack,
  });
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
  if (
    surveyPack.employeesTakingSurvey.length === 6 &&
    surveyPack.employeesTakingSurvey.every((status) => {
      return status.acceptanceStatus === "Declined";
    })
  ) {
    const [surveyors, reviewee] = await Promise.all([
      User.find({
        _id: {
          $in: surveyPack.employeesTakingSurvey.map(
            (status) => status.employee
          ),
        },
      }),
      User.findById(surveyPack.personBeingSurveyed),
    ]);
    for (const surveyor of surveyors) {
      try {
        if (reviewee) {
          await sendParticipantEmail({
            receiverEmail: surveyor.email as string,
            receiverName: surveyor.displayName as string,
            employeeName: reviewee.displayName as string,
          });
        }
      } catch (error) {
        console.error(`Error sending email to ${surveyor.email}`, error);
      }
    }
  }

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

const updateManager = async (req: Request, res: Response) => {
  const {
    params: { id: surveyPackId },
    body: { manager },
  } = req;

  const surveyPack = await SurveyPack.findById({ _id: surveyPackId });
  if (!surveyPack) {
    throw new NotFoundError(`surveyPack ${surveyPackId} not found`);
  }
  surveyPack.manager = manager;

  await surveyPack.save();

  res.status(StatusCodes.ACCEPTED).json({
    msg: "Manager successfully updated",
    manager: surveyPack.manager,
  });
};

const sendReminderEmail = async (req: Request, res: Response) => {
  const {
    params: { id: surveyPackId },
    body: { personBeingSurveyed },
  } = req;

  const surveyPack = await SurveyPack.findById({ _id: surveyPackId });
  if (!surveyPack) {
    throw new NotFoundError(`surveyPack ${surveyPackId} not found`);
  }
  try {
    await sendUserEmail({
      senderName: req.user.name,
      senderEmail: req.user.email,
      name: personBeingSurveyed.displayName as string,
      email: personBeingSurveyed.email as string,
    });

    res.status(200).json({ message: "Reminder email sent successfully." });
  } catch (error) {
    console.error("Error sending email: ", error);
    res.status(500).json({ message: "Failed to send reminder email." });
  }
};

export {
  sendReminderEmail,
  getAllSurveyPacks,
  createSurveyPack,
  getSurveyPack,
  updateSurveyPack,
  deleteSurveyPack,
  getSurveyors,
  updateSurveyors,
  getManagerApproval,
  updateManagerApproval,
  updateManager,
};
