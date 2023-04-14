"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var ResponseSchema = new mongoose.Schema({
    questionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    evaluatedID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    assignedEvaluations: {
        type: Array,
        required: true,
    },
    response: {
        type: mongoose.Schema.Types.Mixed,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
}, { timestamps: true });
var Responses = mongoose.model("Responses", ResponseSchema);
exports.default = Responses;
