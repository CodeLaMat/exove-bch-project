import axios from "axios";
import { URL } from "../enum";

const getAll = async () => {
  try {
    const response = await axios.get(URL.SURVEYPACKS_URL);
    console.log("API response:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching survey packs:", error);
    throw error;
  }
};
export default { getAll };
