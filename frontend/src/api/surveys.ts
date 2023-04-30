import axios from "axios";
import { URL } from "../enum";
import { ISurvey } from "../types/dataTypes";
import Cookies from "js-cookie";

const getAll = async () => {
  const token = Cookies.get("token");
  const response = await axios.get(URL.SURVEYS_URL, {
    withCredentials: true, // set this to true to send cookies with the request
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const deleteSurvey = async (surveyId: string) => {
  const response = await axios.delete(`${URL.SURVEYS_URL}/${surveyId}`);
  return response.data;
};

const addSurvey = async (newSurvey: ISurvey) => {
  const response = await axios.post<ISurvey>(URL.SURVEYS_URL, newSurvey);
  return response.data;
};

export default { getAll, addSurvey, deleteSurvey };
