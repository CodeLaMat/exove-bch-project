import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface FormState {
  category: string;
  question: string;
  description: string;
  formStatus: string;
  isFreeForm: boolean;
  questionType: string;
}

const initialState: FormState = {
  category: "",
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
      state.category = action.payload;
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
  state: FormState = initialState,
  action: FormAction
): FormState {
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
