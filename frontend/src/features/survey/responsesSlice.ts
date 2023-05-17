import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import responsePackService from "../../../src/api/responses";
import {
  IResponsePack,
  IResponsePacks,
  IResponseInput,
} from "../../types/dataTypes";
import { AxiosError } from "axios";

const initialState: IResponsePacks = {
  responsePacks: [],
};

const responsePacksSlice = createSlice({
  name: "responsePacks",
  initialState,
  reducers: {
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
  extraReducers: (builder) => {
    builder.addCase(
      initialiseResponsePacks.fulfilled,
      (state, action: PayloadAction<IResponsePack[]>) => {
        state.responsePacks = action.payload;
      }
    );
    builder.addCase(
      updatedResponsePack.fulfilled,
      (state, action: PayloadAction<IResponsePack[]>) => {
        state.responsePacks = action.payload;
      }
    );
    builder.addCase(
      addResponseToPack.fulfilled,
      (state, action: PayloadAction<IResponsePack[]>) => {
        state.responsePacks = action.payload;
      }
    );
  },
});

export const initialiseResponsePacks = createAsyncThunk(
  "responsePacks/initialize",
  async () => {
    const responsePacks = await responsePackService.getAll();
    return responsePacks;
  }
);
export const updatedResponsePack = createAsyncThunk(
  "responsePacks/updateResponsePack",
  async (
    {
      responsePackId,
      allResponses,
    }: { responsePackId: string; allResponses: IResponseInput },
    { rejectWithValue }
  ) => {
    try {
      await responsePackService.updateResponsePack(
        responsePackId,
        allResponses
      );
      const updatedResponsePacks = await responsePackService.getAll();
      return updatedResponsePacks;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const addResponseToPack = createAsyncThunk(
  "responsePacks/addResponseToPack",
  async (
    {
      responsePackId,
      allResponses,
    }: { responsePackId: string; allResponses: IResponseInput },
    { rejectWithValue }
  ) => {
    try {
      await responsePackService.addResponse(responsePackId, allResponses);
      const updatedResponsePacks = await responsePackService.getAll();
      return updatedResponsePacks;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

export const { updateResponsePack } = responsePacksSlice.actions;

export default responsePacksSlice.reducer;
