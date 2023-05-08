import sendEmail from "./sendEmail";

interface EmailDetails {
  name: string;
  email: string;
  senderEmail: string;
  senderName: string;
}

const sendUserEmail = async ({
  senderName,
  senderEmail,
  name,
  email,
}: EmailDetails) => {
  console.log("Sending email to:", name, email, senderEmail);
  const message =
    "<p>Please sign into the EXOVE Survey plateform and include the names of five other employees and one manager to evaluate you</p>";

  return sendEmail({
    from: `${senderName} <${senderEmail}>`,
    to: email,
    subject: "Add Survey Participants",
    html: `<h4>Hello, ${name}!</h4>
    ${message}`,
  });
};

export default sendUserEmail;
