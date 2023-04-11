import axios from "axios";

const customFetch = axios.create({
  baseURL: "/api/v1",
});

// customFetch.interceptors.request.use((config) => {
//   const user = getUserFromLocalStorage();
//   if (user) {
//     config.headers["Authorization"] = `Bearer ${user.token}`;
//   }
//   return config;
// });

export default customFetch;
