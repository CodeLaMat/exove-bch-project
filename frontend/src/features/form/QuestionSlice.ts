import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { URL } from "../../enum";
import { RootState } from "../../app/store";

interface IQuestion {
  category: string;
  question: string;
  description: string;
  questionType: string;
  showQuestionModal: boolean;
}

const initialState: IQuestion = {
  category: "",
  question: "",
  description: "",
  questionType: "",
  showQuestionModal: false,
};

const formSlice = createSlice({
  name: "questionSlice",
  initialState,
  reducers: {
    setQuestion: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
      state.question = action.payload;
      state.description = action.payload;
      state.questionType = action.payload;
    },

    setShowQuestionModal: (state, action: PayloadAction<boolean>) => {
      state.showQuestionModal = action.payload;
    },
  },
});

export const { setQuestion, setShowQuestionModal } = formSlice.actions;

export const selectSurvey = (state: RootState) => state.survey;
export default formSlice.reducer;
