import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { URL } from "../../enum";
import { RootState } from "../../app/store";

interface QuestionnarieState {
  section: string;
  question: string;
  description: string;
  formStatus: string;
  isFreeForm: boolean;
  questionType: string;
}

const initialState: QuestionnarieState = {
  section: "",
  question: "",
  description: "",
  formStatus: "completed" || "incomplete" || "inreview",
  isFreeForm: false,
  questionType: "",
};

const formSlice = createSlice({
  name: "formSlice",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.section = action.payload;
    },

    setQuestion: (state, action: PayloadAction<string>) => {
      state.question = action.payload;
    },

    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
  },
});

export interface SetIsFreeForm {
  type: "SET_IS_FREEFORM";
  payload: boolean;
}

export type FormAction = SetIsFreeForm;

export function formTypeReducer(
  state: QuestionnarieState = initialState,
  action: FormAction
): QuestionnarieState {
  switch (action.type) {
    case "SET_IS_FREEFORM":
      return { ...state, isFreeForm: action.payload };
    default:
      return state;
  }
}

export const { setCategory, setQuestion, setDescription } = formSlice.actions;

export const selectSurvey = (state: RootState) => state.survey;
export default formSlice.reducer;
