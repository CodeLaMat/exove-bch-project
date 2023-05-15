import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ICreateSurveyPack,
  IParticipant,
  SurveyPackStatus,
} from "../../types/dataTypes";
import surveyPackService from "../../api/surveyPack";

export interface IEmployeesTakingSurvey {
  acceptanceStatus: "Pending" | "Approved" | "Declined";
  isSurveyComplete: boolean;
  employee: string;
}

interface ISurveyPackData {
  personBeingSurveyed: string;
  survey: string;
  employeesTakingSurvey: IEmployeesTakingSurvey[];
  deadline: Date;
  status: SurveyPackStatus;
  manager: string;
  managerapproved: boolean;
  hrapproved: boolean;
}

interface ISurveyPackState {
  surveyPack: ISurveyPackData;
}

const initialState: ISurveyPackState = {
  surveyPack: {
    personBeingSurveyed: "",
    survey: "",
    employeesTakingSurvey: [],
    deadline: new Date(),
    status: SurveyPackStatus.OPEN,
    manager: "",
    managerapproved: false,
    hrapproved: false,
  },
};

const surveyPackSlice = createSlice({
  name: "surveyPack",
  initialState,
  reducers: {
    setPersonBeingSurveyed: (state, action: PayloadAction<string>) => {
      state.surveyPack.personBeingSurveyed = action.payload;
    },
    setSurvey: (state, action: PayloadAction<string>) => {
      state.surveyPack.survey = action.payload;
    },
    setEmployeesTakingSurvey: (
      state,
      action: PayloadAction<IEmployeesTakingSurvey[]>
    ) => {
      state.surveyPack.employeesTakingSurvey = action.payload;
    },

    setDeadline: (state, action: PayloadAction<Date>) => {
      state.surveyPack.deadline = action.payload;
    },
    setStatus: (state, action: PayloadAction<SurveyPackStatus>) => {
      state.surveyPack.status = action.payload;
    },
    setSurveyManager: (state, action: PayloadAction<string>) => {
      state.surveyPack.manager = action.payload;
    },
    setManagerApproved: (state, action: PayloadAction<boolean>) => {
      state.surveyPack.managerapproved = action.payload;
    },
    setHRApproved: (state, action: PayloadAction<boolean>) => {
      state.surveyPack.hrapproved = action.payload;
    },
    setSurveyPack: (state, action: PayloadAction<any>) => {
      state.surveyPack = action.payload;
    },
  },
});

export const createNewSurveyPack = createAsyncThunk(
  "surveyPack/createNewSurveyPack",
  async (newSurveyPack: ICreateSurveyPack, { dispatch }) => {
    try {
      await surveyPackService.createSurveyPack(newSurveyPack);
      dispatch(setSurveyPack(newSurveyPack));
    } catch (error) {}
  }
);

export const {
  setSurveyPack,
  setDeadline,
  setEmployeesTakingSurvey,
  setHRApproved,
  setSurveyManager,
  setManagerApproved,
  setPersonBeingSurveyed,
  setStatus,
  setSurvey,
} = surveyPackSlice.actions;

export default surveyPackSlice.reducer;
