"use strict";
// export type Question = {
//   category: string;
//   question: string;
//   description?: string;
//   isFreeForm: boolean;
// };
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyorsStatus = exports.SurveyorsAcceptance = exports.SurveyPackStatus = exports.Question_Type = exports.surveyStatus = exports.Categories = exports.UserRoles = void 0;
var UserRoles;
(function (UserRoles) {
    UserRoles["employee"] = "employee";
    UserRoles["HR"] = "hr";
    UserRoles["manager"] = "manager";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
var Categories;
(function (Categories) {
    Categories["QUALITY"] = "Quality focus";
    Categories["PEOPLE_SKILLS"] = "People skills";
    Categories["SELF_GUIDANCE"] = "Self guidance";
    Categories["LEADERSHIP"] = "Leadership";
    Categories["READINESS_CHANGE"] = "Readiness for change";
    Categories["CREATIVITY"] = "Creativity";
    Categories["GENERAL"] = "General evaluation";
})(Categories = exports.Categories || (exports.Categories = {}));
var surveyStatus;
(function (surveyStatus) {
    surveyStatus["COMPLETED"] = "Completed";
    surveyStatus["OPEN"] = "Open";
})(surveyStatus = exports.surveyStatus || (exports.surveyStatus = {}));
var Question_Type;
(function (Question_Type) {
    Question_Type["MULTIPLE"] = "Multiple choice";
    Question_Type["FREE_FORM"] = "Free form";
})(Question_Type = exports.Question_Type || (exports.Question_Type = {}));
var SurveyPackStatus;
(function (SurveyPackStatus) {
    SurveyPackStatus["OPEN"] = "Open";
    SurveyPackStatus["INPROGRESS"] = "in_progress";
    SurveyPackStatus["CLOSED"] = "Closed";
})(SurveyPackStatus = exports.SurveyPackStatus || (exports.SurveyPackStatus = {}));
var SurveyorsAcceptance;
(function (SurveyorsAcceptance) {
    SurveyorsAcceptance["DECLINED"] = "Declined";
    SurveyorsAcceptance["APPROVED"] = "Approved";
    SurveyorsAcceptance["PENDING"] = "Pending";
})(SurveyorsAcceptance = exports.SurveyorsAcceptance || (exports.SurveyorsAcceptance = {}));
var SurveyorsStatus;
(function (SurveyorsStatus) {
    SurveyorsStatus["FILLED"] = "filled";
    SurveyorsStatus["OPEN"] = "Open";
})(SurveyorsStatus = exports.SurveyorsStatus || (exports.SurveyorsStatus = {}));
