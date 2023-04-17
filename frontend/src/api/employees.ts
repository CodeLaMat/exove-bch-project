import axios from "axios";

const employeesURL = process.env.EMPLOYEES_URL || "";

const getAll = async () => {
  const response = await axios.get(employeesURL);
  return response.data;
};

export default { getAll };
