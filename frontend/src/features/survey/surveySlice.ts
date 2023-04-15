import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import questionsService from "../../api/questions";
import { AppDispatch } from "../../app/store";
import { IQuestion, ISurvey } from "../../types/dataTypes";

const initialSurveyState: ISurvey = {
  _id: "",
  surveyName: "",
  description: "",
  questions: [],
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
    setQuestions: (state, action: PayloadAction<IQuestion[]>) => {
      state.questions = action.payload;
    },
    getAllQuestions: (state, action: PayloadAction<IQuestion[]>) => {
      state.questions = action.payload;
    },
  },
});

export const { setName, setDescription, setQuestions, getAllQuestions } =
  surveySlice.actions;

export const initialiseQuestions = () => {
  return async (dispatch: AppDispatch) => {
    const questionsFromStorage = sessionStorage.getItem("questions");
    if (questionsFromStorage) {
      const questions = JSON.parse(questionsFromStorage);
      dispatch(setQuestions(questions));
    } else {
      const questions = (await questionsService.getAll()) as IQuestion[];
      dispatch(setQuestions(questions));
    }
  };
};

export default surveySlice.reducer;
