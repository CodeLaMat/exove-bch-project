import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SurveyType } from "../../types/dataTypes";

interface SurveyPack {
  _id: string;
  creationDate: Date;
  surveySubject: string;
  survey: SurveyType[];
  participants: string[];
  deadline: Date;
  status: "returned" | "open" | "closed";
  manager: string;
  canEdit: boolean;
  canCreate: boolean;
}

interface SurveyPackState {
  surveyPack: SurveyPack;
}

const initialState: SurveyPackState = {
  surveyPack: {
    _id: "",
    creationDate: new Date(),
    surveySubject: "",
    survey: [],
    participants: ["", "", "", "", ""],
    deadline: new Date(),
    status: "returned",
    manager: "",
    canEdit: true,
    canCreate: true,
  },
};

const surveyPackSlice = createSlice({
  name: "surveyPack",
  initialState,
  reducers: {
    setSurveySubject(state, action: PayloadAction<string>) {
      state.surveyPack.surveySubject = action.payload;
    },
    setParticipant(
      state,
      action: PayloadAction<{ index: number; name: string }>
    ) {
      state.surveyPack.participants[action.payload.index] = action.payload.name;
    },
    editParticipant(
      state,
      action: PayloadAction<{ index: number; name: string }>
    ) {
      state.surveyPack.participants = state.surveyPack.participants.map(
        (participant, i) => {
          if (i === action.payload.index) {
            return action.payload.name;
          }
          return participant;
        }
      );
    },
    setManager(state, action: PayloadAction<string>) {
      state.surveyPack.manager = action.payload;
    },
    editManager(state, action: PayloadAction<string>) {
      state.surveyPack.manager = action.payload;
    },
    setDeadline(state, action: PayloadAction<Date>) {
      state.surveyPack.deadline = action.payload;
    },
    setStatus(state, action: PayloadAction<"returned" | "open" | "closed">) {
      state.surveyPack.status = action.payload;
    },
    setCanEdit(state, action: PayloadAction<boolean>) {
      state.surveyPack.canEdit = action.payload;
    },
    setCanCreate(state, action: PayloadAction<boolean>) {
      state.surveyPack.canCreate = action.payload;
    },
    setSurveyPack(state, action: PayloadAction<SurveyPack>) {
      state.surveyPack = action.payload;
    },
  },
});

export const {
  setSurveySubject,
  setParticipant,
  editParticipant,
  setManager,
  editManager,
  setDeadline,
  setStatus,
  setCanEdit,
  setCanCreate,
  setSurveyPack,
} = surveyPackSlice.actions;

export default surveyPackSlice.reducer;
