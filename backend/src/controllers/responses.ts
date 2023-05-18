import { Request, Response } from "express";
import ResponsePack from "../models/responses";
import SurveyPack from "../models/surveyPack";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors";
import User from "../models/user";
import { CustomRequest, LdapUser } from "./user";

// const addResponse = async (req: Request, res: Response) => {
//   const { id: responsePackId } = req.params;
//   const {
//     name: [employeeName],
//   } = req.user;
//   const { allResponses } = req.body;

//   const responsePack = await ResponsePack.findOne({ _id: responsePackId });
//   if (!responsePack) {
//     throw new NotFoundError(`No responsePack with id: ${responsePackId}`);
//   }

//   const employeeTakingSurvey = responsePack.totalResponses.find(
//     async (response) => {
//       const employee = await User.findById(response.employeeTakingSurvey);
//       return employee && employee.displayName === employeeName;
//     }
//   );

//   if (!employeeTakingSurvey) {
//     throw new UnauthorizedError(
//       `User ${employeeName} is not authorized to add responses to this survey`
//     );
//   }
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

  // Get all employee ids
  const employeeIds = responsePack.totalResponses.map(
    (response) => response.employeeTakingSurvey
  );

  // Get all employees
  const employees = await User.find({ _id: { $in: employeeIds } });

  const employeeTakingSurvey = responsePack.totalResponses.find((response) => {
    const employee = employees.find(
      (e) => e._id.toString() === response.employeeTakingSurvey.toString()
    );
    return employee && employee.displayName === employeeName;
  });
  console.log("responsePackId:", responsePackId);
  console.log("responsePack:", responsePack);
  console.log("employeeTakingSurvey:", employeeTakingSurvey);
  console.log("All employeeTakingSurvey:", responsePack.totalResponses);
  console.log("All employees:", employees);
  console.log("Matched employeeTakingSurvey:", employeeTakingSurvey);
  if (!employeeTakingSurvey) {
    throw new UnauthorizedError(
      `User ${employeeName} is not authorized to add responses to this survey`
    );
  }

  for (const { question, response } of allResponses) {
    const currentEmployeeResponse = employeeTakingSurvey.allResponses.find(
      (response) =>
        response.question._id?.toString() === question &&
        response.responsePack.toString() === responsePackId
    );
    if (currentEmployeeResponse && currentEmployeeResponse.response !== "") {
      throw new BadRequestError(
        `User ${employeeName} has already submitted a response for this question`
      );
    }

    if (currentEmployeeResponse) {
      currentEmployeeResponse.response = response;
    }

    if (response === "") {
      throw new BadRequestError("Response cannot be empty");
    } else {
      employeeTakingSurvey.allResponses.push({
        question: { _id: question },
        response,
        responsePack: responsePackId,
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
