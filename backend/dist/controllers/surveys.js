"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSurvey = exports.getOneSurvey = exports.getAllSurveys = exports.deleteSurvey = exports.addSurvey = void 0;
const surveys_1 = __importDefault(require("../models/surveys"));
const addSurvey = async (req, res) => {
    try {
        const newSurvey = new surveys_1.default({
            surveyName: req.body.surveyName,
            description: req.body.description,
            questions: req.body.questions,
        });
        // console.log("survey: ", survey);
        // res.status(200).json({
        //   status: 200,
        //   message: "survey saved successfully" + survey,
        // })
        if (await newSurvey.save()) {
            res.status(200).json({
                status: 200,
                message: "question saved successfully" + surveys_1.default,
            });
        }
    }
    catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
};
exports.addSurvey = addSurvey;
const deleteSurvey = async (req, res) => {
    res.send("delete Question");
};
exports.deleteSurvey = deleteSurvey;
const getAllSurveys = async (req, res) => {
    try {
        // res.send("getting all surveys");
        const getSurveys = await surveys_1.default.find();
        res.status(200).json(getSurveys);
    }
    catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
    // res.send("gel all surveys");
};
exports.getAllSurveys = getAllSurveys;
const getOneSurvey = async (req, res) => {
    res.send("get one surveys");
};
exports.getOneSurvey = getOneSurvey;
const updateSurvey = async (req, res) => {
    res.send("update one surveys");
};
exports.updateSurvey = updateSurvey;
