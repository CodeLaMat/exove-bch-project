import axios from "axios";
import { URL } from "../enum";
import { IParticipant, ISurvey, ISurveypack, User } from "../types/dataTypes";

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

const createSurveyPack = async (
  surveyPack: ISurveypack
): Promise<ISurveypack> => {
  try {
    const response = await axios.post(URL.SURVEYPACKS_URL, surveyPack);
    console.log("API response:", response);
    return response.data;
  } catch (error) {
    console.error("Error creating survey pack:", error);
    throw error;
  }
};

const updatePersonBeingSurveyed = async (
  surveyPackId: string,
  personBeingSurveyed: User[]
): Promise<void> => {
  try {
    const response = await axios.patch(
      `${URL.SURVEYPACKS_URL}/surveypacks/${surveyPackId}`,
      {
        personBeingSurveyed,
      }
    );
    console.log("API response:", response);
  } catch (error) {
    console.error("Error updating personBeingSurveyed:", error);
    throw error;
  }
};

const updateSurvey = async (
  surveyPackId: string,
  survey: ISurvey[]
): Promise<void> => {
  try {
    const response = await axios.patch(
      `${URL.SURVEYPACKS_URL}/surveypacks/${surveyPackId}`,
      {
        survey,
      }
    );
    console.log("API response:", response);
  } catch (error) {
    console.error("Error updating survey:", error);
    throw error;
  }
};

const addParticipant = async (
  surveyPackId: string,
  participant: IParticipant
): Promise<void> => {
  try {
    const response = await axios.post(
      `${URL.SURVEYPACKS_URL}/surveypacks/${surveyPackId}/participants`,
      {
        participant,
      }
    );
    console.log("API response:", response);
  } catch (error) {
    console.error("Error adding participant:", error);
    throw error;
  }
};

export default {
  getAll,
  updatePersonBeingSurveyed,
  updateSurvey,
  addParticipant,
  createSurveyPack,
};
