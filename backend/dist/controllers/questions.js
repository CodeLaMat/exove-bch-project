"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateQuestion = exports.getOneQuestion = exports.getAllQuestions = exports.deleteQuestion = exports.addQuestion = void 0;
const addQuestion = async (req, res) => {
    res.send("add Question");
};
exports.addQuestion = addQuestion;
const deleteQuestion = async (req, res) => {
    res.send("delete Question");
};
exports.deleteQuestion = deleteQuestion;
const getAllQuestions = async (req, res) => {
    res.send("gel all Questions");
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
