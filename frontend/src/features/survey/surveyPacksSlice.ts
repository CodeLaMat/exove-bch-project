import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  ISurveypack,
  IParticipant,
  User,
  ISurveyPacks,
} from "../../types/dataTypes";
import { Dispatch, Action } from "redux";
import { IEmployee } from "../../types/userTypes";
import { SurveyPackStatus } from "../../types/dataTypes";
import surveyPackService from "../../api/surveyPack";
import Cookies from "js-cookie";

const storedSurveyPacksString = sessionStorage.getItem("storedSurveyPacks");
const storedSurveyPacks = storedSurveyPacksString
  ? JSON.parse(storedSurveyPacksString)
  : [];

const initialState: ISurveyPacks = {
  surveyPacks: storedSurveyPacks || [],
};

export interface IEmployeesTakingSurvey {
  acceptanceStatus: "Pending" | "Approved" | "Declined";
  isSurveyComplete: boolean;
  employee: User;
}

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
    createSurveyPack: (state, action: PayloadAction<ISurveypack>) => {
      state.surveyPacks.push(action.payload);
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
    dispatch(getAllSurveyPacks(surveyPacks));
  };
};

export const createNewSurveyPack = (surveyPack: ISurveypack) => {
  return async (dispatch: Dispatch<Action>) => {
    const newSurveyPack = await surveyPackService.createSurveyPack(surveyPack);
    dispatch(createSurveyPack(newSurveyPack));
  };
};

export const {
  getAllSurveyPacks,
  createSurveyPack,
  updatePersonBeingSurveyed,
} = surveyPacksSlice.actions;

export default surveyPacksSlice.reducer;
