import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import surveysService from "../../api/surveys";
import { ISurvey, ISurveys } from "../../types/dataTypes";
import { AppDispatch } from "../../app/store";

const initialSurveysState: ISurveys = {
  surveys: [],
};

export const surveysSlice = createSlice({
  name: "surveys",
  initialState: initialSurveysState,
  reducers: {
    getAllSurveys: (state, action: PayloadAction<ISurvey[]>) => {
      state.surveys = action.payload;
      sessionStorage.setItem("surveys", JSON.stringify(action.payload));
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
    const surveysFromStorage = sessionStorage.getItem("surveys");
    if (surveysFromStorage) {
      const surveys = JSON.parse(surveysFromStorage);
      dispatch(getAllSurveys(surveys));
    } else {
      const surveys = await surveysService.getAll();
      dispatch(getAllSurveys(surveys));
    }
  };
};

export const removeSurvey = (surveyid: string) => {
  return async (dispatch: AppDispatch) => {
    await surveysService.deleteSurvey(surveyid);
    dispatch({
      type: "surveys/deleteSurvey",
      payload: surveyid,
    });

    const surveysFromStorage = JSON.parse(
      sessionStorage.getItem("surveys") || "[]"
    );
    const updatedSurveys = surveysFromStorage.filter(
      (survey: ISurvey) => survey._id !== surveyid
    );
    sessionStorage.setItem("surveys", JSON.stringify(updatedSurveys));
  };
};

export default surveysSlice.reducer;
