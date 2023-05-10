import axios from "axios";
import { URL } from "../enum";
import Cookies from "js-cookie";

const getAll = async () => {
  const token = Cookies.get("token");
  const response = await axios.get(URL.EMPLOYEES_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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

const updateManager = async (employeeId: string, managerId: string) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.put(
      `${URL.EMPLOYEES_URL}/${employeeId}/manager`,
      {
        managerId: managerId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("update Manager", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update manager");
  }
};

export default { getAll, updateManager };
export default { getAll, updateManager };
