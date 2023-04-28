import axios from "axios";

const questionsURL = process.env.QUESTIONS_URL || "";

const getAllQuestions = async () => {
  const response = await axios.get(questionsURL, {
    withCredentials: true // set this to true to send cookies with the request
  });
  return response.data;
};

export default { getAllQuestions };
