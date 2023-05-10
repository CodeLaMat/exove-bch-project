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
  },
});

export const initialiseSurveyPacks = () => {
  return async (dispatch: Dispatch<Action>) => {
    const surveyPacks = await surveyPackService.getAll();
    dispatch(getAllSurveyPacks(surveyPacks));
  };
};

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

export const { getAllSurveyPacks, updatePersonBeingSurveyed } =
  surveyPacksSlice.actions;

export default surveyPacksSlice.reducer;
