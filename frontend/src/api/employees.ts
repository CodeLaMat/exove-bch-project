import axios from "axios";
import { URL } from "../enum";

const getAll = async () => {
  const response = await axios.get("http://localhost:5010/api/v1/users/user");
  return response.data;
};

export default { getAll };
