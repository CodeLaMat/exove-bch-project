import axios from "axios";
import { URL } from "../../enum";

const getAll = async () => {
  const response = await axios.get(URL.SURVEYS_URL);
  console.log(response.data);
  return response.data;
};

export default { getAll };
