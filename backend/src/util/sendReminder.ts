import sendEmail from "./sendEmail";

interface EmailDetails {
  revieweeName: string;
  revieweeEmail: string;
}

const sendReminder = async ({ revieweeName, revieweeEmail }: EmailDetails) => {
  const message = `<p> Please sign into the EXOVE evaluation platform and add employees to do your evaluation. </p>`;

  return sendEmail({
    from: `Essi Salomaa <essisalomaa@test.com>`,
    to: revieweeEmail,
    subject: `EXOVE Evaluation of ${revieweeName}`,
    html: `<h4>Hello, ${revieweeName}!</h4>
    ${message}`,
  });
};

export default sendReminder;
