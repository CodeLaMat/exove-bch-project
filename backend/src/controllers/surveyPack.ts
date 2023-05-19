import { Request, Response } from "express";
import SurveyPack from "../models/surveyPack";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";
import User from "../models/user";
import {
  sendUserEmail,
  sendHrApprovalEmail,
  sendParticipantEmail,
  sendDeclineEmail,
  sendReminder,
} from "../util";
import ResponsePack from "../models/responses";
import survey from "../models/surveys";
import { IEmployeeTakingSurvey, IParticipant } from "../types/dataTypes";

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
      senderEmail: req.user.email[0],
      senderName: req.user.name[0],
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
  // const updatedSurveyPack = await SurveyPack.findByIdAndUpdate(
  //   surveyPackId,
  //   req.body,
  //   {
  //     new: true,
  //     runValidators: true,
  //   }
  // );
  const updatedSurveyPack = await SurveyPack.findByIdAndUpdate(
    surveyPackId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  ).populate("survey", "questions");
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
            senderEmail: req.user.email[0],
            senderName: req.user.name[0],
          });
        }
      } catch (error) {
        console.error(`Error sending email to ${surveyor.email}`, error);
      }
    }
    const surveys = await survey.findById(updatedSurveyPack?.survey);
    if (!surveys) {
      throw new NotFoundError("surveys not found");
    }
    // const allResponses = surveys.questions.map((question) => {
    //   return {
    //     question: question._id,
    //     response: "",
    //   };
    // });

    console.log("updatedSurveyPack", updatedSurveyPack);
    console.log(
      "updatedSurveyPack.employeesTakingSurvey",
      updatedSurveyPack?.employeesTakingSurvey
    );
    console.log("updatedSurveyPack.survey", updatedSurveyPack?.survey);
    console.log(
      "updatedSurveyPack.survey.questions",
      updatedSurveyPack?.survey?.questions
    );

    let totalResponses: IEmployeeTakingSurvey[];

    if (
      updatedSurveyPack &&
      updatedSurveyPack.employeesTakingSurvey &&
      updatedSurveyPack.survey.questions &&
      updatedSurveyPack.survey
    ) {
      totalResponses = updatedSurveyPack.employeesTakingSurvey.map((e) => ({
        employeeTakingSurvey: e.employee,
        allResponses: updatedSurveyPack.survey.questions.map((q) => ({
          question: q._id,
          response: "",
        })),
      }));
    } else {
      totalResponses = [];
    }

    // const totalResponses = updatedSurveyPack?.employeesTakingSurvey.map(
    //   (e) => ({
    //     employeeTakingSurvey: e.employee,
    //     allResponses: allResponses,
    //   })
    // );

    const responsePack = ResponsePack.create({
      surveyPack: updatedSurveyPack?._id,
      personBeingSurveyed: updatedSurveyPack?.personBeingSurveyed,
      survey: updatedSurveyPack?.survey,
      totalResponses: totalResponses,
    });
    console.log("responsePack", responsePack);

    return res.status(StatusCodes.OK).json({
      msg: "surveyPack successfully updated and responsePack created",
      surveyPack: updatedSurveyPack,
      responsePack: responsePack,
    });
  } else {
    return res.status(StatusCodes.OK).json({
      msg: "surveyPack successfully updated",
      surveyPack: updatedSurveyPack,
    });
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
  const surveyPack = await SurveyPack.findById(
    { _id: surveyPackId },
    { employeesTakingSurvey: 1, manager: 1, managerapproved: 1 }
  )
    .populate("employeesTakingSurvey")
    .populate("survey");
  if (!surveyPack) {
    throw new NotFoundError(`surveyPack ${surveyPackId} not found`);
  }
  const employeesTakingSurvey = surveyPack.employeesTakingSurvey;
  const survey = surveyPack.survey;
  return res
    .status(StatusCodes.OK)
    .json({ employeesTakingSurvey: employeesTakingSurvey, survey: survey });
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
  const existingParticipants = new Set(
    surveyPack.employeesTakingSurvey.map((participant) => participant.employee)
  );
  const newParticipants = employeesTakingSurvey.filter(
    (participant: IParticipant) =>
      !existingParticipants.has(participant.employee)
  );

  surveyPack.employeesTakingSurvey.push(...newParticipants);

  await surveyPack.save();
  if (
    surveyPack.employeesTakingSurvey.length === 6 &&
    surveyPack.employeesTakingSurvey.every((status) => {
      return status.acceptanceStatus === "Pending";
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
  } else if (
    surveyPack.employeesTakingSurvey.some((status) => {
      return status.acceptanceStatus === "Declined";
    })
  ) {
    const personBeingSurveyed = await User.findById(
      surveyPack.personBeingSurveyed
    );
    if (personBeingSurveyed) {
      try {
        await sendDeclineEmail({
          senderName: req.user.name[0],
          employeeEmail: personBeingSurveyed.email as string,
          employeeName: personBeingSurveyed.displayName as string,
        });
      } catch (error) {
        console.error(
          `Error sending declined email to ${personBeingSurveyed.email}`,
          error
        );
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
    { survey: 1, employeesTakingSurvey: 1, manager: 1, managerapproved: 1 }
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

// Added by Eyvaz to update the manager in the surveyPack
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

// Added by Eyvaz to send email to the pesronBeingSurveyed to select the participants
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
    await sendReminder({
      revieweeName: personBeingSurveyed.displayName,
      revieweeEmail: personBeingSurveyed.email,
    });

    res.status(200).json({ message: "Reminder email sent successfully." });
  } catch (error) {
    console.error("Error sending email: ", error);
    res.status(500).json({ message: "Failed to send reminder email." });
  }
};

// Added by Eyvaz to update the participant individually
const replaceSurveyor = async (req: Request, res: Response) => {
  const {
    params: { id: surveyPackId },
    body: { oldUserId, newParticipant },
  } = req;

  const surveyPack = await SurveyPack.findById({ _id: surveyPackId });
  if (!surveyPack) {
    throw new NotFoundError(`SurveyPack ${surveyPackId} not found`);
  }

  const indexToReplace = surveyPack.employeesTakingSurvey.findIndex(
    (participant) => participant.employee._id.toString() === oldUserId
  );
  if (indexToReplace === -1) {
    throw new BadRequestError(`User with id ${oldUserId} not found in survey`);
  }
  surveyPack.employeesTakingSurvey[indexToReplace] = newParticipant;

  await surveyPack.save();

  const newUser = await User.findById(newParticipant.employee);
  if (!newUser) {
    throw new NotFoundError(
      `User with id ${newParticipant.employee} not found`
    );
  }

  try {
    await sendParticipantEmail({
      receiverEmail: newUser.email as string,
      receiverName: newUser.displayName as string,
      employeeName: newUser.displayName as string,
    });
  } catch (error) {
    console.error(`Error sending email to ${newUser.email}`, error);
  }

  res.status(StatusCodes.OK).json({
    msg: `User ${oldUserId} replaced with user ${newParticipant.employee} successfully`,
    employeesTakingSurvey: surveyPack.employeesTakingSurvey,
  });
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
  replaceSurveyor,
};
