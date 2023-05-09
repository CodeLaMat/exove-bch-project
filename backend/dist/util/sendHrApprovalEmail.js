"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendEmail_1 = __importDefault(require("./sendEmail"));
const sendHrApprovalEmail = async ({ senderName, senderEmail, receiverName, receiverEmail, employeeName, }) => {
    const message = `<p>Please sign into the EXOVE Evaluation platform and complete the  evaluation of ${employeeName}</p>`;
    return (0, sendEmail_1.default)({
        from: `${senderName} <${senderEmail}>`,
        to: receiverEmail,
        subject: `EXOVE Evaluation for ${employeeName}`,
        html: `<h4>Hello, ${receiverName}!</h4>
    ${message}`,
    });
};
exports.default = sendHrApprovalEmail;
