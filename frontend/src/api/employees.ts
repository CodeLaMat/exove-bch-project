import axios from "axios";
import { URL } from "../enum";

const getAll = async () => {
  const response = await axios.get(URL.EMPLOYEES_URL);
  return response.data;
};
const updateManager = async (employeeId: string, managerId: string) => {
  try {
    const response = await axios.put(
      `${URL.EMPLOYEES_URL}/${employeeId}/manager`,
      {
        managerId: managerId,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update manager");
  }
};

export default { getAll, updateManager };
