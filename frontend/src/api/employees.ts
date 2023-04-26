import axios from "axios";

const employeesURL = process.env.EMPLOYEES_URL || "";

const getAll = async () => {
  const response = await axios.get("http://localhost:5010/api/v1/users/user");
  return response.data;
};

export default { getAll };
