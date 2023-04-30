import axios from "axios";
import { URL } from "../enum";

const getAllQuestions = async () => {
  const response = await axios.get(URL.QUESTIONS_URL, {
    withCredentials: true, // set this to true to send cookies with the request
  });
  return response.data;
};

export default { getAllQuestions };
