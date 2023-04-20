"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSurveyors = exports.updateSurveyors = exports.getSurveyors = exports.deleteSurveyPack = exports.updateSurveyPack = exports.getSurveyPack = exports.createSurveyPack = void 0;
const surveyPack_1 = __importDefault(require("../models/surveyPack"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const createSurveyPack = async (req, res) => {
    const surveyPack = await surveyPack_1.default.create({ ...req.body });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ surveyPack });
    // const userRole = req.user?.role;
    // console.log(userRole);
    // if (userRole === "hr") {
    //   const surveyPack = await SurveyPack.create(req.body);
    //   return res.status(StatusCodes.CREATED).json({ surveyPack });
    // } else {
    //   return res
    //     .status(StatusCodes.FORBIDDEN)
    //     .json({ msg: "Not authorized to create surveyPack" });
    // }
};
exports.createSurveyPack = createSurveyPack;
const getSurveyPack = async (req, res) => {
    const { params: { id: surveyPackId }, } = req;
    const surveyPack = await surveyPack_1.default.findOne({ _id: surveyPackId });
    if (!surveyPack) {
        throw new errors_1.NotFoundError(`No surveyPack with id ${surveyPackId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ surveyPack });
};
exports.getSurveyPack = getSurveyPack;
const updateSurveyPack = async (req, res) => {
    var _a, _b;
    const surveyPackId = req.params.id;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const surveyPack = await surveyPack_1.default.findById(surveyPackId);
    if (!surveyPack) {
        throw new errors_1.NotFoundError(`No surveyPack with id ${surveyPack}`);
    }
    const userRole = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
    if (userRole === "hr") {
        const updatedSurveyPack = await surveyPack_1.default.findByIdAndUpdate(surveyPackId, req.body, { new: true });
        return res.status(http_status_codes_1.StatusCodes.OK).json(updatedSurveyPack);
    }
    else {
        const { surveyors } = req.body;
        // Check if the user is a surveyor in the surveyPack
        const userIsSurveyor = surveyPack.surveyors.some((surveyor) => surveyor.staff.toString() === userId);
        if (!userIsSurveyor) {
            throw new errors_1.UnauthorizedError("You are not authorized to update this survey pack");
        }
        surveyPack.surveyors = surveyors;
        const updatedSurveyPack = await surveyPack.save();
        return res.status(http_status_codes_1.StatusCodes.OK).json(updatedSurveyPack);
    }
};
exports.updateSurveyPack = updateSurveyPack;
const deleteSurveyPack = async (req, res) => {
    var _a;
    const surveyPackId = req.params.id;
    const userRole = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
    if (userRole === "hr") {
        const surveyPack = await surveyPack_1.default.findByIdAndRemove(surveyPackId);
        if (!surveyPack) {
            throw new errors_1.NotFoundError(`No surveyPack with id ${surveyPack}`);
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json(surveyPack);
    }
    else {
        return res
            .status(http_status_codes_1.StatusCodes.FORBIDDEN)
            .json({ message: "You are not authorized to delete this survey pack" });
    }
};
exports.deleteSurveyPack = deleteSurveyPack;
const getSurveyors = async (req, res) => {
    res.send("get surveyors");
};
exports.getSurveyors = getSurveyors;
const updateSurveyors = async (req, res) => {
    res.send("update surveyors");
};
exports.updateSurveyors = updateSurveyors;
const deleteSurveyors = async (req, res) => {
    res.send("delete surveyors");
};
exports.deleteSurveyors = deleteSurveyors;
