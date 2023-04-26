import axios from "axios";

const questionsURL = process.env.QUESTIONS_URL || "";

const getAllQuestions = async () => {
  const response = await axios.get("http://localhost:5010/api/v1/questions");
  return response.data;
};

export default { getAllQuestions };
