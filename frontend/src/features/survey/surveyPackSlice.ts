import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ISurveypack,
  IParticipant,
  IQuestion,
  IQuestions,
} from "../../types/dataTypes";

const initialState: ISurveypack = {
  _id: "",
  creationDate: "",
  updateDate: "",
  personBeingSurveyed: "",
  survey: [],
  participants: [],
  deadline: "",
  status: "open",
  managerapproved: false,
  hrapproved: false,
  manager: [""],
};

const surveyPackSlice = createSlice({
  name: "surveyPack",
  initialState,
  reducers: {
    setSurveyPack: (state, action: PayloadAction<ISurveypack>) => {
      return action.payload;
    },
    updateCreationDate: (state, action: PayloadAction<string>) => {
      state.creationDate = action.payload;
    },
    updateUpdateDate: (state, action: PayloadAction<string>) => {
      state.updateDate = action.payload;
    },
    updatePersonBeingSurveyed: (state, action: PayloadAction<string>) => {
      state.personBeingSurveyed = action.payload;
    },
    addParticipant: (state, action: PayloadAction<IParticipant>) => {
      state.participants.push(action.payload);
    },
    removeParticipant: (state, action: PayloadAction<string>) => {
      state.participants = state.participants.filter(
        (participant) => participant.id !== action.payload
      );
    },
    updateDeadline: (state, action: PayloadAction<string>) => {
      state.deadline = action.payload;
    },
    updateStatus: (
      state,
      action: PayloadAction<"open" | "closed" | "inprogress">
    ) => {
      state.status = action.payload;
    },

    toggleManagerApproved: (state) => {
      state.managerapproved = !state.managerapproved;
    },
    toggleHrApproved: (state) => {
      state.hrapproved = !state.hrapproved;
    },
    addManager: (state, action: PayloadAction<string>) => {
      state.manager.push(action.payload);
    },
    removeManager: (state, action: PayloadAction<string>) => {
      state.manager = state.manager.filter(
        (manager) => manager !== action.payload
      );
    },
  },
});

export const {
  setSurveyPack,
  updateCreationDate,
  updateUpdateDate,
  updatePersonBeingSurveyed,
  addParticipant,
  removeParticipant,
  updateDeadline,
  updateStatus,
  toggleManagerApproved,
  toggleHrApproved,
  addManager,
  removeManager,
} = surveyPackSlice.actions;

export default surveyPackSlice.reducer;
