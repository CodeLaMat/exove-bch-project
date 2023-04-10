import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SurveyType } from "../../types/dataTypes";
import surveysService from "../../services/surveys";
import { AppDispatch } from "../../store";

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
  },
});

export const { getAllSurveys } = surveysSlice.actions;

export const initialiseSurveys = () => {
  return async (dispatch: AppDispatch) => {
    const surveys = await surveysService.getAll();
    dispatch(getAllSurveys(surveys));
  };
};

export default surveysSlice.reducer;
