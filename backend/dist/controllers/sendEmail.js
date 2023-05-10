"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmailEthereal = async (req, res) => {
    let testAccount = await nodemailer_1.default.createTestAccount();
    //create reusable transporter object using the default SMTP transport
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: "caleigh.muller17@ethereal.email",
            pass: "NXRrD26KHDVRh3533B",
        },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Essi Saloma" <essisalomaa@test.com>',
        to: "eyvazalishov@test.com, jasondansie@test.com",
        subject: "Evaluation survey",
        html: "<p>Hello,  the evaluation period, select all five employees and one manager to evaluate you</p>",
    });
    res.json(info);
};
exports.default = sendEmailEthereal;
