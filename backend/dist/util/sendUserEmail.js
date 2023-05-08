"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendEmail_1 = __importDefault(require("./sendEmail"));
const sendUserEmail = async ({ senderName, senderEmail, name, email, }) => {
    console.log("Sending email to:", name, email, senderEmail);
    const message = "<p>Please sign into the EXOVE Survey plateform and include the names of five other employees and one manager to evaluate you</p>";
    return (0, sendEmail_1.default)({
        from: `${senderName} <${senderEmail}>`,
        to: email,
        subject: "Add Survey Participants",
        html: `<h4>Hello, ${name}!</h4>
    ${message}`,
    });
};
exports.default = sendUserEmail;
