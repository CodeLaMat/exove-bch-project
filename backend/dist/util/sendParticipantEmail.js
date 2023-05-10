"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendEmail_1 = __importDefault(require("./sendEmail"));
const sendParticipantEmail = async ({ receiverName, receiverEmail, employeeName, }) => {
    const message = `<p> ${employeeName} has chosen you to evaluate his/her performance. Please sign into the EXOVE evaluation platform and validate this request </p>`;
    return (0, sendEmail_1.default)({
        from: `Essi Salomaa <essisalomaa@test.com>`,
        to: receiverEmail,
        subject: `EXOVE Evaluation for ${employeeName}`,
        html: `<h4>Hello, ${receiverName}!</h4>
    ${message}`,
    });
};
exports.default = sendParticipantEmail;
