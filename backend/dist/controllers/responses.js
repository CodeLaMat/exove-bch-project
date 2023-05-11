"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showStats = exports.updateResponse = exports.getSingleResponse = exports.getAllResponses = exports.addResponse = void 0;
const responses_1 = __importDefault(require("../models/responses"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const user_1 = __importDefault(require("../models/user"));
exports.showStats = exports.updateResponse = exports.getSingleResponse = exports.getAllResponses = exports.addResponse = void 0;
const responses_1 = __importDefault(require("../models/responses"));
const surveyPack_1 = __importDefault(require("../models/surveyPack"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const addResponse = async (req, res) => {
    const { id: responsePackId } = req.params;
    const { name: employeeName } = req.user;
    const { allResponses } = req.body;
    // check if user is listed as an 'employeeTakingSurvey' in the 'responosePack'
    const responsePack = await responses_1.default.findOne({ _id: responsePackId });
    if (!responsePack) {
        throw new errors_1.NotFoundError(`No responsePack with id: ${responsePackId}`);
    }
    let employeeTakingSurvey;
    for (const response of responsePack.totalResponses) {
        const employee = await user_1.default.findById(response.employeeTakingSurvey);
        if ((employee === null || employee === void 0 ? void 0 : employee.displayName) === employeeName) {
            employeeTakingSurvey = response;
            break;
        }
    }
    if (!employeeTakingSurvey) {
        throw new errors_1.UnauthorizedError(`User ${employeeName} is not authorized to add responses to this survey`);
    }
    // update the 'totalResponses' object with the new responses
    for (const { question, response } of allResponses) {
        // Find the 'allResponses' object corresponding to the current question
        const currentEmployeeResponse = employeeTakingSurvey.allResponses.find((response) => { var _a; return ((_a = response.question._id) === null || _a === void 0 ? void 0 : _a.toString()) === question; });
        if (currentEmployeeResponse && currentEmployeeResponse.response !== "") {
            throw new errors_1.BadRequestError(`User ${employeeName} has already submitted a response for this question`);
        }
        // Update the 'allResponses' object with the new response
        if (currentEmployeeResponse) {
            currentEmployeeResponse.response = response;
        }
        else {
            employeeTakingSurvey.allResponses.push({
                question: { _id: question },
                response,
            });
        }
    }
    await responsePack.save();
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ msg: "Response added successfully", responsePack });
    const employeeTakingSurveyId = req.user.userId.toString();
    const { surveyPack: surveyPackId } = req.body;
    const surveyPack = await surveyPack_1.default.findOne({ _id: surveyPackId });
    if (!surveyPack) {
        throw new errors_1.NotFoundError(`No surveyPack with id: ${surveyPackId}`);
    }
    const isValidEmployee = surveyPack.employeesTakingSurvey.find((employee) => employee.employee.toString() === employeeTakingSurveyId);
    if (!isValidEmployee) {
        throw new errors_1.UnauthorizedError("Your not authorized to take this survey");
    }
    const alreadySubmitted = await responses_1.default.findOne({
        surveyPack: surveyPackId,
        employeeTakingSurveyId: req.user.userId,
    });
    if (alreadySubmitted) {
        throw new errors_1.BadRequestError("Already submitted an Evaluation for this employee");
    }
    req.body.employeeTakingSurveyId = req.user.userId;
    const responsePack = await responses_1.default.create(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ responsePack });
};
exports.addResponse = addResponse;
const getAllResponses = async (req, res) => {
    const responsePack = await responses_1.default.find({});
    res.status(http_status_codes_1.StatusCodes.OK).json({ responsePack, count: responsePack.length });
    const responsePack = await responses_1.default.find({}).populate({
        path: "personBeingSurveyedId",
        select: "totalResponses",
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ responsePack });
};
exports.getAllResponses = getAllResponses;
const getSingleResponse = async (req, res) => {
    const { id: responsePackId } = req.params;
    const responsePack = await responses_1.default.findOne({ _id: responsePackId });
    if (!responsePack) {
        throw new errors_1.NotFoundError(`No responsePack with id ${responsePackId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ responsePack });
};
exports.getSingleResponse = getSingleResponse;
const updateResponse = async (req, res) => {
    const { id: responsePackId } = req.params;
    const responsePack = await responses_1.default.findOne({ _id: responsePackId });
    if (!responsePack) {
        throw new errors_1.NotFoundError(`No surveyPack with id: ${responsePackId}`);
    }
    const updatedResponsePack = await responses_1.default.findOneAndUpdate({ _id: responsePackId }, req.body, { new: true, runValidators: true });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ updatedResponsePack });
const getSingleResponse = async (req, res) => {
    const { id: responsePackId } = req.params;
    const responsePack = await responses_1.default.findOne({ _id: responsePackId });
    if (!responsePack) {
        throw new errors_1.NotFoundError(`No responsePack with id ${responsePackId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ responsePack });
};
exports.getSingleResponse = getSingleResponse;
const updateResponse = async (req, res) => {
    const { id: responsePackId } = req.params;
    const { totalResponses } = req.body;
    const responsePack = await responses_1.default.findOne({ _id: responsePackId });
    if (!responsePack) {
        throw new errors_1.NotFoundError(`No responsePack with id ${responsePackId}`);
    }
    responsePack.totalResponses = totalResponses;
    await responsePack.save();
    res.status(http_status_codes_1.StatusCodes.OK).json({ responsePack });
};
exports.updateResponse = updateResponse;
exports.updateResponse = updateResponse;
const showStats = async (req, res) => {
    let stats = await responses_1.default.aggregate([]);
    res.send("show stats");
};
exports.showStats = showStats;
