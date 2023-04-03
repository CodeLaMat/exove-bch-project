"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSurvey = exports.getOneSurvey = exports.getAllSurveys = exports.deleteSurvey = exports.addSurvey = void 0;
const surveys_1 = __importDefault(require("../models/surveys"));
const addSurvey = async (req, res) => {
    try {
        const survey = new surveys_1.default({
            question: req.body.name,
            description: req.body.description,
            questions: req.body.questions,
            // add any other necessary fields here
        });
        console.log("survey: ", survey);
        res.status(200).json({
            status: 200,
            message: "question saved successfully" + survey,
        });
        // if (await question.save()) { 
        //   res.status(200).json({
        //     status: 200,
        //     message: "question saved successfully" + question,
        //   })
        // } 
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
        res.send("get one Question");
    }
    catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
    // res.send("gel all Questions");
};
exports.getAllSurveys = getAllSurveys;
const getOneSurvey = async (req, res) => {
    res.send("get one Question");
};
exports.getOneSurvey = getOneSurvey;
const updateSurvey = async (req, res) => {
    res.send("update one Question");
};
exports.updateSurvey = updateSurvey;
