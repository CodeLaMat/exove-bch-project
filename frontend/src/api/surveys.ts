import axios from "axios";
import { URL } from "../enum";
import { ISurvey } from "../types/dataTypes";

const surveysURL = process.env.SURVEYS_URL || "";

const getAll = async () => {
  const token = localStorage.getItem("jwtToken");

  const response = await axios.get("http://localhost:5010/api/v1/surveys", {
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
