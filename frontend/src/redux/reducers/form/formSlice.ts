import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import { Dispatch, Action } from "redux";
import { QuestionProps, SurveyType } from "../../types/dataTypes";
import questionsService from "../../services/questions";
import surveysService from "../../services/surveys";
import { useEffect } from "react";

export interface SurveyData {
  _id: string;
  description: string;
  questions: QuestionProps[];
  surveyName: string;
}

const initialSurveyState: SurveyData = {
  _id: "",
  surveyName: "",
  description: "",
  questions: [],
};

export interface SurveysData {
  surveys: SurveyType[];
}

const initialSurveysState: SurveysData = {
  surveys: [],
};

export const surveySlice = createSlice({
  name: "survey",
  initialState: initialSurveyState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.surveyName = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setQuestions: (state, action: PayloadAction<QuestionProps[]>) => {
      state.questions = action.payload;
    },

    getAllQuestions: (state, action: PayloadAction<QuestionProps[]>) => {
      state.questions = action.payload;
    },
  },
});

export const {
  setName,
  setDescription,
  setQuestions,

  getAllQuestions,
} = surveySlice.actions;

export const initialiseQuestions = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const questions = (await questionsService.getAll()) as QuestionProps[];
      dispatch(setQuestions(questions));
    } catch (error) {
      console.log("Error fetching the questions", error);
    }
  };
};

export const useInitialiseQuestions = (dispatch: AppDispatch) => {
  useEffect(() => {
    dispatch(initialiseQuestions());
  }, [dispatch]);
};

export const surveysSlice = createSlice({
  name: "surveys",
  initialState: initialSurveysState,
  reducers: {
    setSurveys: (state, action: PayloadAction<SurveyType[]>) => {
      state.surveys = action.payload;
    },
    addSurvey: (state, action: PayloadAction<SurveyType>) => {
      state.surveys.push(action.payload);
    },
    removeSurvey: (state, action: PayloadAction<number>) => {
      state.surveys = state.surveys.filter(
        (survey) => survey._id !== action.payload
      );
    },
    updateSurvey: (state, action: PayloadAction<SurveyType>) => {
      const index = state.surveys.findIndex(
        (survey) => survey._id === action.payload._id
      );
      if (index !== -1) {
        state.surveys[index] = action.payload;
      }
    },

    getAllSurveys: (state, action: PayloadAction<SurveyType[]>) => {
      state.surveys = action.payload;
    },
  },
});

export const {
  setSurveys,
  addSurvey,
  removeSurvey,
  updateSurvey,
  getAllSurveys,
} = surveysSlice.actions;

export const initialiseSurveys = () => {
  return async (dispatch: Dispatch<Action>) => {
    const surveys = await surveysService.getAll();
    dispatch(getAllSurveys(surveys));
  };
};

export default surveySlice.reducer;
