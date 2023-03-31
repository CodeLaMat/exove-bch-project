"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateQuestion = exports.getOneQuestion = exports.getAllQuestions = exports.deleteQuestion = exports.addQuestion = void 0;
const questions_1 = __importDefault(require("../models/questions"));
const addQuestion = async (req, res) => {
    res.send("add Question");
};
exports.addQuestion = addQuestion;
const deleteQuestion = async (req, res) => {
    res.send("delete Question");
};
exports.deleteQuestion = deleteQuestion;
const getAllQuestions = async (req, res) => {
    try {
        const questions = await questions_1.default.find();
        res.status(200).json(questions);
    }
    catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
    // res.send("gel all Questions");
};
exports.getAllQuestions = getAllQuestions;
const getOneQuestion = async (req, res) => {
    res.send("get one Question");
};
exports.getOneQuestion = getOneQuestion;
const updateQuestion = async (req, res) => {
    res.send("update one Question");
};
exports.updateQuestion = updateQuestion;
