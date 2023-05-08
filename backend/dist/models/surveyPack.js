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
const dataTypes_1 = require("../types/dataTypes");
const SurveyorSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    acceptanceStatus: {
        type: String,
        enum: Object.values(dataTypes_1.SurveyorsAcceptance),
        default: "Pending",
    },
    isSurveyComplete: {
        type: Boolean,
        default: false,
    },
});
const SurveyPackSchema = new mongoose.Schema({
    personBeingSurveyed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please select the employee to survey"],
    },
    survey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "survey",
        required: [true, "Please select the survey"],
    },
    employeesTakingSurvey: {
        type: [SurveyorSchema],
        validate: [
            {
                validator: function (val) {
                    return val.length <= 6;
                },
                message: "The maximum number of employees allowed is 6",
            },
        ],
        required: [true, "Please include the employees"],
    },
    deadline: {
        type: Date,
        required: [true, "Please add deadline"],
        default: Date.now(),
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(dataTypes_1.SurveyPackStatus),
        default: "Open",
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please add the manager"],
    },
    managerapproved: {
        type: Boolean,
        default: false,
    },
    hrapproved: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const SurveyPack = mongoose.model("SurveyPack", SurveyPackSchema);
exports.default = SurveyPack;
