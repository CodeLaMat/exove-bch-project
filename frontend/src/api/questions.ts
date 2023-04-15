import axios from "axios";

const questionsURL = process.env.QUESTIONS_URL || "";

const getAll = async () => {
  const response = await axios.get(questionsURL);
  return response.data;
};

export default { getAll };
