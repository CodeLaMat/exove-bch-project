"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showStats = exports.updateResponses = exports.getAllResponses = exports.addResponse = void 0;
const addResponse = async (req, res) => {
    res.send("add Response");
};
exports.addResponse = addResponse;
const getAllResponses = async (req, res) => {
    res.send("gel all Responses");
};
exports.getAllResponses = getAllResponses;
const updateResponses = async (req, res) => {
    res.send("update all Responses");
};
exports.updateResponses = updateResponses;
const showStats = async (req, res) => {
    res.send("show stats");
};
exports.showStats = showStats;
