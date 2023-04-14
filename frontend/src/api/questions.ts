import axios from "axios";
import { URL } from "../enum";

const getAll = async () => {
  const response = await axios.get(URL.QUESTIONS_URL);
  return response.data;
};

export default { getAll };
