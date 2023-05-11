"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.showStats =
  exports.updateResponse =
  exports.getSingleResponse =
  exports.getAllResponses =
  exports.addResponse =
    void 0;
const responses_1 = __importDefault(require("../models/responses"));
const surveyPack_1 = __importDefault(require("../models/surveyPack"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const addResponse = async (req, res) => {
  const employeeTakingSurvey = req.user.userId.toString();
  const { surveyPack: surveyPackId } = req.body;
  const surveyPack = await surveyPack_1.default.findOne({ _id: surveyPackId });
  if (!surveyPack) {
    throw new errors_1.NotFoundError(`No surveyPack with id: ${surveyPackId}`);
  }
  const isValidEmployee = surveyPack.employeesTakingSurvey.find(
    (employee) => employee.employee.toString() === employeeTakingSurvey
  );
  if (!isValidEmployee) {
    throw new errors_1.UnauthorizedError(
      "Your not authorized to take this survey"
    );
  }
  const alreadySubmitted = await responses_1.default.findOne({
    surveyPack: surveyPackId,
    employeeTakingSurvey: req.user.userId,
  });
  if (alreadySubmitted) {
    throw new errors_1.BadRequestError(
      "Already submitted an Evaluation for this employee"
    );
  }
  req.body.employeeTakingSurvey = req.user.userId;
  const responsePack = await responses_1.default.create(req.body);
  res.status(http_status_codes_1.StatusCodes.CREATED).json({ responsePack });
};
exports.addResponse = addResponse;
const getAllResponses = async (req, res) => {
  const responsePack = await responses_1.default.find({}).populate({
    path: "personBeingSurveyedId",
    select: "totalResponses",
  });
  res.status(http_status_codes_1.StatusCodes.OK).json({ responsePack });
};
exports.getAllResponses = getAllResponses;
const getSingleResponse = async (req, res) => {
  const { id: responsePackId } = req.params;
  const responsePack = await responses_1.default.findOne({
    _id: responsePackId,
  });
  if (!responsePack) {
    throw new errors_1.NotFoundError(
      `No responsePack with id ${responsePackId}`
    );
  }
  res.status(http_status_codes_1.StatusCodes.OK).json({ responsePack });
};
exports.getSingleResponse = getSingleResponse;
const updateResponse = async (req, res) => {
  const { id: responsePackId } = req.params;
  const { totalResponses } = req.body;
  const responsePack = await responses_1.default.findOne({
    _id: responsePackId,
  });
  if (!responsePack) {
    throw new errors_1.NotFoundError(
      `No responsePack with id ${responsePackId}`
    );
  }
  responsePack.totalResponses = totalResponses;
  await responsePack.save();
  res.status(http_status_codes_1.StatusCodes.OK).json({ responsePack });
};
exports.updateResponse = updateResponse;
const showStats = async (req, res) => {
  let stats = await responses_1.default.aggregate([]);
  res.send("show stats");
};
exports.showStats = showStats;
