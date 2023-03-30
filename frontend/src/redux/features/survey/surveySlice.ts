import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface SurveyState {
  surveyName: string;
  surveySubject: string;
  questions: string[];
  answers: { [key: string]: string };
  surveyStatus: "notStarted" | "inProgress" | "completed";
}

const initialState: SurveyState = {
  surveyName: "",
  surveySubject: "",
  questions: [],
  answers: {},
  surveyStatus: "notStarted",
};

const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    setSurveyName: (state, action: PayloadAction<string>) => {
      state.surveyName = action.payload;
    },
    setSurveySubject: (state, action: PayloadAction<string>) => {
      state.surveySubject = action.payload;
    },
    setQuestions: (state, action: PayloadAction<string[]>) => {
      state.questions = action.payload;
    },
    setAnswer: (
      state,
      action: PayloadAction<{ question: string; answer: string }>
    ) => {
      state.answers[action.payload.question] = action.payload.answer;
    },
    setSurveyStatus: (
      state,
      action: PayloadAction<"notStarted" | "inProgress" | "completed">
    ) => {
      state.surveyStatus = action.payload;
    },
  },
});

export const {
  setSurveyName,
  setSurveySubject,
  setQuestions,
  setAnswer,
  setSurveyStatus,
} = surveySlice.actions;

export const selectSurvey = (state: RootState) => state.survey;
export default surveySlice.reducer;
