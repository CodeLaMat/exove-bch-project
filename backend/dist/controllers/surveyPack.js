"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSurveyors = exports.getSurveyors = exports.deleteSurveyPack = exports.updateSurveyPack = exports.getSurveyPack = exports.createSurveyPack = void 0;
const surveyPack_1 = __importDefault(require("../models/surveyPack"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const util_1 = require("../util");
const createSurveyPack = async (req, res) => {
    const surveyPack = await surveyPack_1.default.create(req.body);
    if (!surveyPack) {
        throw new errors_1.BadRequestError("Please complete the form");
    }
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ surveyPack });
};
exports.createSurveyPack = createSurveyPack;
const getSurveyPack = async (req, res) => {
    const { params: { id: surveyPackId }, } = req;
    const surveyPack = await surveyPack_1.default.findOne({ _id: surveyPackId });
    if (!surveyPack) {
        throw new errors_1.NotFoundError(`No surveyPack with id ${surveyPackId}`);
    }
    (0, util_1.checkPermissions)(req.user, surveyPackId);
    res.status(http_status_codes_1.StatusCodes.OK).json({ surveyPack });
};
exports.getSurveyPack = getSurveyPack;
const updateSurveyPack = async (req, res) => {
    const { params: { id: surveyPackId }, user: { role }, } = req;
    const surveyPack = await surveyPack_1.default.findById({ _id: surveyPackId });
    if (!surveyPack) {
        throw new errors_1.NotFoundError(`No product with id : ${surveyPackId}`);
    }
    if (role === "hr") {
        await surveyPack_1.default.findByIdAndUpdate(surveyPackId, req.body, {
            new: true,
            runValidators: true,
        });
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ msg: "surveyPack successfully updated" });
    }
    else {
        const { surveyors } = req.body;
        surveyPack.employeesTakingSurvey = surveyors;
        await surveyPack.save();
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ msg: "EmployeesTakingSurvey updated successfully" });
    }
};
exports.updateSurveyPack = updateSurveyPack;
const deleteSurveyPack = async (req, res) => {
    const { params: { id: surveyPackId }, } = req;
    const surveyPack = await surveyPack_1.default.findByIdAndRemove({ _id: surveyPackId });
    if (!surveyPack) {
        throw new errors_1.NotFoundError(`No product with id : ${surveyPackId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Success! SurveyPack removed." });
};
exports.deleteSurveyPack = deleteSurveyPack;
const getSurveyors = async (req, res) => {
    const { params: { id: surveyPackId }, } = req;
    const surveyPack = await surveyPack_1.default.findById({ _id: surveyPackId }).populate("employeesTakingSurvey");
    if (!surveyPack) {
        throw new errors_1.NotFoundError(`surveyPack ${surveyPackId} not found`);
    }
    const surveyors = surveyPack.employeesTakingSurvey;
    return res.status(http_status_codes_1.StatusCodes.OK).json({ surveyors });
};
exports.getSurveyors = getSurveyors;
const updateSurveyors = async (req, res) => {
    const { params: { id: surveyPackId }, body: { employeesTakingSurvey }, } = req;
    const surveyPack = await surveyPack_1.default.findById({ _id: surveyPackId });
    if (!surveyPack) {
        throw new errors_1.NotFoundError(`surveyPack ${surveyPackId} not found`);
    }
    surveyPack.employeesTakingSurvey = employeesTakingSurvey;
    await surveyPack.save();
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ msg: "EmployeesTakingSurvey updated successfully" });
};
exports.updateSurveyors = updateSurveyors;
