"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendEmail_1 = __importDefault(require("./sendEmail"));
const sendReminder = async ({ revieweeName, revieweeEmail }) => {
    const message = `<p> Please sign into the EXOVE evaluation platform and add employees to do your evaluation. </p>`;
    return (0, sendEmail_1.default)({
        from: `Essi Salomaa <essisalomaa@test.com>`,
        to: revieweeEmail,
        subject: `EXOVE Evaluation of ${revieweeName}`,
        html: `<h4>Hello, ${revieweeName}!</h4>
    ${message}`,
    });
};
exports.default = sendReminder;
