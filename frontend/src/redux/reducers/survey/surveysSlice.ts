import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SurveyType } from "../../types/dataTypes";
import surveysService from "../../services/surveys";
import { AppDispatch } from "../../store";
import deleteSurvey from "./surveySlice";

export interface SurveysData {
  surveys: SurveyType[];
}

const initialSurveysState: SurveysData = {
  surveys: [],
};

export const surveysSlice = createSlice({
  name: "surveys",
  initialState: initialSurveysState,
  reducers: {
    getAllSurveys: (state, action: PayloadAction<SurveyType[]>) => {
      state.surveys = action.payload;
    },
    deleteSurvey: (state, action: PayloadAction<string>) => {
      state.surveys = state.surveys.filter(
        (survey) => survey._id !== action.payload
      );
    },
  },
});

export const { getAllSurveys } = surveysSlice.actions;

export const initialiseSurveys = () => {
  return async (dispatch: AppDispatch) => {
    const surveys = await surveysService.getAll();
    dispatch(getAllSurveys(surveys));
  };
};

export const removeSurvey = (surveyid: string) => {
  return async (dispatch: AppDispatch) => {
    await surveysService.deleteSurvey(surveyid);
    dispatch({
      type: "surveys/deleteSurvey",
      payload: surveyid,
    });
  };
};

export default surveysSlice.reducer;
