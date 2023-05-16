"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendEmail_1 = __importDefault(require("./sendEmail"));
const sendDeclineEmail = async ({ senderName, employeeName, employeeEmail, }) => {
    const message = `<p> ${senderName} has declined to participate in your evaluation.  Please sign into the EXOVE evaluation platform and add a new employee to evaluate you. </p>`;
    return (0, sendEmail_1.default)({
        from: `Essi Salomaa <essisalomaa@test.com>`,
        to: employeeEmail,
        subject: `EXOVE Evaluation for ${employeeName}`,
        html: `<h4>Hello, ${employeeName}!</h4>
    ${message}`,
    });
};
exports.default = sendDeclineEmail;
