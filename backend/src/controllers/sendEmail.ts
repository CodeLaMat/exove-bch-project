import { Request, Response } from "express";
import nodemailer from "nodemailer";

const sendEmailEthereal = async (req: Request, res: Response) => {
  let testAccount = await nodemailer.createTestAccount();

  //create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
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
export default sendEmailEthereal;
