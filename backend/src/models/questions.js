"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var QuestionSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: {
            values: [
                "Quality focus",
                "People skills",
                "Self guidance",
                "Leadership",
                "Readiness for change",
                "Creativity",
                "General Evaluation",
            ],
            message: "{VALUE} is not supported",
        },
    },
    question: {
        type: String,
        required: [true, "Question must be provided"],
    },
    description: {
        type: String,
    },
    questionType: {
        type: String,
        enum: {
            values: [
                "Multiple choice",
                "Free form",
            ],
            message: "{VALUE} is not supported",
        },
    },
});
var Question = mongoose.model("Question", QuestionSchema);
exports.default = Question;
