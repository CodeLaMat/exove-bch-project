import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IQuestion, ISurvey } from "../../types/dataTypes";
import { AppDispatch } from "../../store";
import questionsService from "../../services/questions";

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
    try {
      const questions = (await questionsService.getAll()) as IQuestion[];
      dispatch(setQuestions(questions));
    } catch (error) {
      console.log("Error fetching the questions", error);
    }
  };
};

export default surveySlice.reducer;
