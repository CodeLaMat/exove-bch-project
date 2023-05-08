"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailerConfig_1 = __importDefault(require("./nodemailerConfig"));
const sendEmail = async ({ from, to, subject, html }) => {
    let testAccount = await nodemailer_1.default.createTestAccount();
    const transporter = nodemailer_1.default.createTransport(nodemailerConfig_1.default);
    return transporter.sendMail({
        from,
        to,
        subject,
        html,
    });
};
exports.default = sendEmail;
