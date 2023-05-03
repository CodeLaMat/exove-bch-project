import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  // ISurveypack,
  IParticipant,
  User,
  ISurveyPacks,
} from "../../types/dataTypes";
import { Dispatch, Action } from "redux";
import { IEmployee } from "../../types/userTypes";
import { SurveyPackStatus } from "../../types/dataTypes";
import surveyPackService from "../../api/surveyPack";
import axios from "axios";
import { ISurvey } from "../../types/dataTypes";

export interface ISurveypack {
  _id: string;
  createdAt: Date;
  personBeingSurveyed: string;
  survey: ISurvey[];
  employeesTakingSurvey: IParticipant[];
  deadline: Date;
  status: SurveyPackStatus;
  manager: string;
  managerapproved: boolean;
  hrapproved: boolean;
}

const dateString = "2023-05-01"; // Example date string
const deadline = new Date(dateString);

const storedSurveyPacksString = sessionStorage.getItem("storedSurveyPacks");
const storedSurveyPacks = storedSurveyPacksString
  ? JSON.parse(storedSurveyPacksString)
  : [];

const initialState: ISurveyPacks = {
  surveyPacks: storedSurveyPacks,
};

export interface IEmployeesTakingSurvey {
  acceptanceStatus: "Pending" | "Accepted" | "Declined";
  isSurveyComplete: boolean;
  employee: User;
}

export const fetchSurveyPack = createAsyncThunk(
  "surveyPack/fetchSurveyPack",
  async () => {
    const response = await axios.get("http://localhost:5010/api/v1/surveyPack");
    return response.data;
  }
);

export const updateSurveyPack = createAsyncThunk(
  "surveyPack/updateSurveyPack",
  async (updatedSurveyPack: ISurveypack) => {
    const response = await axios.patch(
      `http://localhost:5010/api/v1/surveyPack/${updatedSurveyPack._id}`,
      updatedSurveyPack
    );
    return response.data;
  }
);

export const removeSurveyPackAsync = createAsyncThunk(
  "surveyPack/removeSurveyPack",
  async (surveyPackId: string) => {
    await axios.delete(
      `http://localhost:5010/api/v1/surveyPack/${surveyPackId}`
    );
    return surveyPackId;
  }
);

const surveyPacksSlice = createSlice({
  name: "surveyPacks",
  initialState,
  reducers: {
    getAllSurveyPacks: (state, action: PayloadAction<ISurveypack[]>) => {
      state.surveyPacks = action.payload;
      sessionStorage.setItem(
        "storedSurveyPacks",
        JSON.stringify(action.payload)
      );
    },
    updatePersonBeingSurveyed: (
      state,
      action: PayloadAction<{
        surveyPackId: string;
        personBeingSurveyed: string;
      }>
    ) => {
      const { surveyPackId, personBeingSurveyed } = action.payload;
      const surveyPack = state.surveyPacks.find(
        (pack) => pack._id === surveyPackId
      );
      if (surveyPack) {
        surveyPack.personBeingSurveyed = personBeingSurveyed;
      }
    },
  },
});

export const initialiseSurveyPacks = () => {
  return async (dispatch: Dispatch<Action>) => {
    const surveyPacks = await surveyPackService.getAll();
    // sessionStorage.setItem("storedSurveyPacks", surveyPacks);
    dispatch(getAllSurveyPacks(surveyPacks));
  };
};

export const { getAllSurveyPacks, updatePersonBeingSurveyed } =
  surveyPacksSlice.actions;

export default surveyPacksSlice.reducer;
