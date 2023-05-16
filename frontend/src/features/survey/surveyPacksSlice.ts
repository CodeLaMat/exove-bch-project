import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  ISurveypack,
  ISurveyPacks,
  ICreateSurveyPack,
  IParticipantInput,
} from "../../types/dataTypes";
import { Dispatch, Action } from "redux";
import surveyPackService from "../../api/surveyPack";

const storedSurveyPacksString = sessionStorage.getItem("storedSurveyPacks");
const storedSurveyPacks = storedSurveyPacksString
  ? JSON.parse(storedSurveyPacksString)
  : [];

const initialState: ISurveyPacks = {
  surveyPacks: storedSurveyPacks || [],
};

const surveyPacksSlice = createSlice({
  name: "surveyPacks",
  initialState,
  reducers: {
    getAllSurveyPacks: (state, action: PayloadAction<ISurveypack[]>) => {
      state.surveyPacks = action.payload;
      sessionStorage.setItem(
        "storedSurveyPacks",
        JSON.stringify(action.payload)
      );
    },

    updatePersonBeingSurveyed: (
      state,
      action: PayloadAction<{
        surveyPackId: string;
        personBeingSurveyed: string;
      }>
    ) => {
      const { surveyPackId, personBeingSurveyed } = action.payload;
      const surveyPack = state.surveyPacks.find(
        (pack) => pack._id === surveyPackId
      );
      if (surveyPack) {
        surveyPack.personBeingSurveyed = personBeingSurveyed;
      }
    },
    updateManager: (
      state,
      action: PayloadAction<{
        surveyPackId: string;
        manager: string;
      }>
    ) => {
      const { surveyPackId, manager } = action.payload;
      const surveyPack = state.surveyPacks.find(
        (pack) => pack._id === surveyPackId
      );
      if (surveyPack) {
        surveyPack.manager = manager;
      }
    },
    updateSurveyPack: (
      state,
      action: PayloadAction<{
        surveyPackId: string;
        changes: Partial<ICreateSurveyPack>;
      }>
    ) => {
      const { surveyPackId, changes } = action.payload;
      const surveyPack = state.surveyPacks.find(
        (pack) => pack._id === surveyPackId
      );
      if (surveyPack) {
        Object.assign(surveyPack, changes);
      }
    },
    updateParticipantAcceptanceStatus: (
      state,
      action: PayloadAction<{
        surveyPackId: string;
        participantId: string;
        acceptanceStatus: "Pending" | "Approved" | "Declined";
      }>
    ) => {
      const { surveyPackId, participantId, acceptanceStatus } = action.payload;
      const surveyPack = state.surveyPacks.find(
        (pack) => pack._id === surveyPackId
      );
      if (surveyPack) {
        const participant = surveyPack.employeesTakingSurvey.find(
          (participant) => participant.id === participantId
        );
        if (participant) {
          participant.acceptanceStatus = acceptanceStatus;
        }
      }
    },
  },
});

export const initialiseSurveyPacks = () => {
  return async (dispatch: Dispatch<Action>) => {
    const surveyPacks = await surveyPackService.getAll();
    dispatch(getAllSurveyPacks(surveyPacks));
  };
};

export const updateSurveyPack = createAsyncThunk(
  "surveyPacks/updateSurveyPack",
  async (
    {
      surveyPackId,
      changes,
    }: { surveyPackId: string; changes: Partial<ICreateSurveyPack> },
    { dispatch }
  ) => {
    try {
      await surveyPackService.updateSurveyPack(surveyPackId, changes);
      const updatedSurveyPacks = await surveyPackService.getAll();
      dispatch(getAllSurveyPacks(updatedSurveyPacks));
    } catch (error) {
      console.error(error);
    }
  }
);

export const updateManagerInSurvey = createAsyncThunk(
  "surveyPacks/updateManagerInSurveyPack",
  async (
    {
      surveyPackId,
      participantId,
    }: { surveyPackId: string; participantId: string },
    { dispatch }
  ) => {
    try {
      await surveyPackService.updateManager(surveyPackId, participantId);
      const updatedSurveyPacks = await surveyPackService.getAll();
      dispatch(getAllSurveyPacks(updatedSurveyPacks));
    } catch (error) {
      console.error(error);
    }
  }
);

export const updateEmployeesTakingSurvey = createAsyncThunk(
  "surveyPacks/updateEmployeesTakingSurveyInSurveyPack",
  async (
    {
      surveyPackId,
      updatedParticipants,
    }: { surveyPackId: string; updatedParticipants: IParticipantInput[] },
    { dispatch }
  ) => {
    try {
      await surveyPackService.updateEmployeesTakingSurvey(
        surveyPackId,
        updatedParticipants
      );
      const updatedSurveyPacks = await surveyPackService.getAll();
      dispatch(getAllSurveyPacks(updatedSurveyPacks));
    } catch (error) {}
  }
);

export const createNewSurveyPack = createAsyncThunk(
  "surveyPacks/createNewSurveyPack",
  async (newSurveyPack: ICreateSurveyPack, { dispatch }) => {
    try {
      await surveyPackService.createSurveyPack(newSurveyPack);
    } catch (error) {
      // Handle error
    }
  }
);

export const sendReminderEmailToUser = createAsyncThunk(
  "surveyPacks/sendReminderEmail",
  async (
    {
      surveyPackId,
      personBeingSurveyed,
    }: { surveyPackId: string; personBeingSurveyed: string },
    { dispatch }
  ) => {
    try {
      await surveyPackService.sendReminderEmail(
        surveyPackId,
        personBeingSurveyed
      );
      const updatedSurveyPacks = await surveyPackService.getAll();
      dispatch(getAllSurveyPacks(updatedSurveyPacks));
    } catch (error) {
      console.error(error);
    }
  }
);

export const replaceSurveyorInSurvey = createAsyncThunk(
  "surveyPacks/replaceSurveyorInSurvey",
  async (
    {
      surveyPackId,
      oldUserId,
      newParticipant,
    }: {
      surveyPackId: string;
      oldUserId: string;
      newParticipant: IParticipantInput;
    },
    { dispatch }
  ) => {
    try {
      await surveyPackService.replaceSurveyor(
        surveyPackId,
        oldUserId,
        newParticipant
      );
      const updatedSurveyPacks = await surveyPackService.getAll();
      dispatch(getAllSurveyPacks(updatedSurveyPacks));
    } catch (error) {
      console.error(error);
    }
  }
);

export const {
  getAllSurveyPacks,
  updatePersonBeingSurveyed,
  updateManager,
  updateParticipantAcceptanceStatus,
} = surveyPacksSlice.actions;

export default surveyPacksSlice.reducer;
