import sendEmail from "./sendEmail";

interface EmailDetails {
  receiverName: string;
  receiverEmail: string;
  employeeName: string;
}

const sendParticipantEmail = async ({
  receiverName,
  receiverEmail,
  employeeName,
}: EmailDetails) => {
  const message = `<p> ${employeeName} has chosen you to evaluate his/her performance. Please sign into the EXOVE evaluation platform and validate this request </p>`;

  return sendEmail({
    from: `Essi Salomaa <essisalomaa@test.com>`,
    to: receiverEmail,
    subject: `EXOVE Evaluation for ${employeeName}`,
    html: `<h4>Hello, ${receiverName}!</h4>
    ${message}`,
  });
};

export default sendParticipantEmail;
