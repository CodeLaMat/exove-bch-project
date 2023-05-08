import nodemailer from "nodemailer";
import nodemailerConfig from "./nodemailerConfig";

export interface EmailKeys {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
}

const sendEmail = async ({ from, to, subject, html }: EmailKeys) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from,
    to,
    subject,
    html,
  });
};

export default sendEmail;
