import axios from "axios";
import { URL } from "../enum";

const getAllQuestions = async () => {
  const response = await axios.get(URL.QUESTIONS_URL, {
    withCredentials: true,
  });
  return response.data;
};

export default { getAllQuestions };
