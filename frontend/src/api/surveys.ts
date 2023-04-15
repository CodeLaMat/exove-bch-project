import axios from "axios";
import { URL } from "../enum";
import { ISurvey } from "../types/dataTypes";

const surveysURL = process.env.SURVEYS_URL || "";

const getAll = async () => {
  const response = await axios.get(surveysURL);
  console.log(response.data);
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
