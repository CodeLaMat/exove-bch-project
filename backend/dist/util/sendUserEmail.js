"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendEmail_1 = __importDefault(require("./sendEmail"));
const sendUserEmail = async ({ senderName, senderEmail, name, email, }) => {
    const message = "<p>Please sign into the EXOVE Evaluation platform and include the names of five other employees and one manager to evaluate you</p>";
    return (0, sendEmail_1.default)({
        from: `${senderName} <${senderEmail}>`,
        to: email,
        subject: "EXOVE Evaluation! Choose your Evaluators",
        html: `<h4>Hello, ${name}!</h4>
    ${message}`,
    });
};
exports.default = sendUserEmail;
