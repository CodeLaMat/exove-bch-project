import sendEmail from "./sendEmail";

export interface EmailDetails {
  receiverName: string;
  receiverEmail: string;
  senderEmail: string;
  senderName: string;
  employeeName: string;
}

const sendHrApprovalEmail = async ({
  senderName,
  senderEmail,
  receiverName,
  receiverEmail,
  employeeName,
}: EmailDetails) => {
  const message = `<p>Please sign into the EXOVE Evaluation platform and complete the  evaluation of ${employeeName}</p>`;

  return sendEmail({
    from: `${senderName} <${senderEmail}>`,
    to: receiverEmail,
    subject: `EXOVE Evaluation for ${employeeName}`,
    html: `<h4>Hello, ${receiverName}!</h4>
    ${message}`,
  });
};

export default sendHrApprovalEmail;
