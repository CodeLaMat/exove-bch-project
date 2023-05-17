"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showStats = exports.updateResponse = exports.getSingleResponse = exports.getAllResponses = exports.addResponse = void 0;
const responses_1 = __importDefault(require("../models/responses"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const user_1 = __importDefault(require("../models/user"));
const addResponse = async (req, res) => {
    const { id: responsePackId } = req.params;
    const { name: [employeeName], } = req.user;
    const { allResponses } = req.body;
    const responsePack = await responses_1.default.findOne({ _id: responsePackId });
    if (!responsePack) {
        throw new errors_1.NotFoundError(`No responsePack with id: ${responsePackId}`);
    }
    const employeeTakingSurvey = responsePack.totalResponses.find(async (response) => {
        const employee = await user_1.default.findById(response.employeeTakingSurvey);
        return employee && employee.displayName === employeeName;
    });
    if (!employeeTakingSurvey) {
        throw new errors_1.UnauthorizedError(`User ${employeeName} is not authorized to add responses to this survey`);
    }
    for (const { question, response } of allResponses) {
        const currentEmployeeResponse = employeeTakingSurvey.allResponses.find((response) => { var _a; return ((_a = response.question._id) === null || _a === void 0 ? void 0 : _a.toString()) === question; });
        if (currentEmployeeResponse && currentEmployeeResponse.response !== "") {
            throw new errors_1.BadRequestError(`User ${employeeName} has already submitted a response for this question`);
        }
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
};
exports.addResponse = addResponse;
const getAllResponses = async (req, res) => {
    const responsePack = await responses_1.default.find({});
    res.status(http_status_codes_1.StatusCodes.OK).json({ responsePack, count: responsePack.length });
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
};
exports.updateResponse = updateResponse;
const showStats = async (req, res) => {
    let stats = await responses_1.default.aggregate([]);
    res.send("show stats");
};
exports.showStats = showStats;
