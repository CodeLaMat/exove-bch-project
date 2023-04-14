import axios from "axios";
import { URL } from "../../enum";
import { ISurvey } from "../types/dataTypes";

const getAll = async () => {
  const response = await axios.get(URL.SURVEYS_URL);
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
