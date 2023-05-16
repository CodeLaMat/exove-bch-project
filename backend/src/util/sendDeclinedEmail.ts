import sendEmail from "./sendEmail";

interface EmailDetails {
  senderName: string;
  employeeName: string;
  employeeEmail: string;
}

const sendDeclineEmail = async ({
  senderName,
  employeeName,
  employeeEmail,
}: EmailDetails) => {
  const message = `<p> ${senderName} has declined to participate in your evaluation.  Please sign into the EXOVE evaluation platform and add a new employee to evaluate you. </p>`;

  return sendEmail({
    from: `Essi Salomaa <essisalomaa@test.com>`,
    to: employeeEmail,
    subject: `EXOVE Evaluation for ${employeeName}`,
    html: `<h4>Hello, ${employeeName}!</h4>
    ${message}`,
  });
};

export default sendDeclineEmail;
