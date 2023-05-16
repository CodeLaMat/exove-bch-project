import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch, Action } from "redux";
import responsePackService from "../../../src/api/responses";
import {
  IResponsePack,
  IResponsePacks,
  IResponseInput,
} from "../../types/dataTypes";

const initialState: IResponsePacks = {
  responsePacks: [],
};

const responsePacksSlice = createSlice({
  name: "responsePacks",
  initialState,
  reducers: {
    getAllResponsePacks: (state, action: PayloadAction<IResponsePack[]>) => {
      state.responsePacks = action.payload;
    },
    updateResponsePack: (
      state,
      action: PayloadAction<{
        responsePackId: string;
        changes: Partial<IResponsePack>;
      }>
    ) => {
      const { responsePackId, changes } = action.payload;
      const responsePack = state.responsePacks.find(
        (pack) => pack._id === responsePackId
      );
      if (responsePack) {
        Object.assign(responsePack, changes);
      }
    },
  },
});

export const initialiseResponsePacks = () => {
  return async (dispatch: Dispatch<Action>) => {
    const responsePacks = await responsePackService.getAll();
    dispatch(getAllResponsePacks(responsePacks));
  };
};

export const updatedResponsePack = createAsyncThunk(
  "responsePacks/updateResponsePack",
  async (
    {
      responsePackId,
      responseId,
      changes,
    }: { responsePackId: string; responseId: string; changes: IResponseInput },
    { dispatch }
  ) => {
    try {
      await responsePackService.updateResponse(
        responsePackId,
        responseId,
        changes
      );
      const updatedResponsePacks = await responsePackService.getAll();
      dispatch(getAllResponsePacks(updatedResponsePacks));
    } catch (error) {
      console.error(error);
    }
  }
);

export const addResponseToPack = createAsyncThunk(
  "responsePacks/addResponseToPack",
  async (
    {
      responsePackId,
      responseInput,
    }: { responsePackId: string; responseInput: IResponseInput },
    { dispatch }
  ) => {
    try {
      await responsePackService.addResponse(responsePackId, responseInput);
      const updatedResponsePacks = await responsePackService.getAll();
      dispatch(getAllResponsePacks(updatedResponsePacks));
    } catch (error) {
      console.error(error);
    }
  }
);

export const { getAllResponsePacks, updateResponsePack } =
  responsePacksSlice.actions;

export default responsePacksSlice.reducer;
