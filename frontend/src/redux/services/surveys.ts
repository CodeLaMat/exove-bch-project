import axios from "axios";
import { URL } from "../../enum";

// const questionsLink = "http://localhost:3000/questions";

const getAll = async () => {
  const response = await axios.get(URL.SURVEYS_URL);
  return response.data;
};

export default { getAll };
