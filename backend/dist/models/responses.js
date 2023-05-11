"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const QuestionResponseSchema = new mongoose.Schema({
    question: {
const QuestionResponseSchema = new mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
    },
    response: {
        type: String,
    },
});
const SurveyResponsesSchema = new mongoose.Schema({
    employeeTakingSurvey: {
    response: {
        type: String,
    },
});
const SurveyResponsesSchema = new mongoose.Schema({
    employeeTakingSurveyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    allResponses: [QuestionResponseSchema],
});
const ResponsePackSchema = new mongoose.Schema({
    surveyPack: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SurveyPack",
        required: true,
    },
    personBeingSurveyed: {
    allResponses: [QuestionResponseSchema],
});
const ResponsePackSchema = new mongoose.Schema({
    surveyPack: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SurveyPack",
        required: true,
    },
    personBeingSurveyedId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    survey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "survey",
        required: true,
    },
    totalResponses: [SurveyResponsesSchema],
    result: [
        {
            category: {
                type: String,
            },
            sumResponse: {
                type: Number,
            },
        },
    ],
    totalResponses: [SurveyResponsesSchema],
}, { timestamps: true });
ResponsePackSchema.statics.calculateSumResponse = async function (personBeingSurveyedId) {
    const result = await this.aggregate([
        {
            $match: {
                personBeingSurveyed: personBeingSurveyedId,
            },
        },
        {
            $unwind: "$totalResponses",
        },
        {
            $unwind: "$totalResponses.allResponses",
        },
        {
            $lookup: {
                from: "questions",
                localField: "totalResponses.allResponses.question",
                foreignField: "_id",
                as: "question",
            },
        },
        {
            $unwind: "$question",
        },
        {
            $match: {
                "question.questionType": "Multiple choice",
            },
        },
        {
            $addFields: {
                responseValue: {
                    $convert: {
                        input: "$totalResponses.allResponses.response",
                        to: "double",
                        onError: 0,
                        onNull: 0,
                    },
                },
            },
        },
        {
            $group: {
                _id: {
                    category: "$question.category",
                },
                sumResponse: {
                    $sum: "$responseValue",
                },
            },
        },
    ]);
    return result;
};
const ResponsePack = mongoose.model("ResponsePack", ResponsePackSchema);
exports.default = ResponsePack;
const ResponsePack = mongoose.model("ResponsePack", ResponsePackSchema);
exports.default = ResponsePack;
