import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ISurveypack, IParticipant, User } from "../../types/dataTypes";
import { IEmployee } from "../../types/userTypes";
import { SurveyPackStatus } from "../../types/dataTypes";
import axios from "axios";
import { UserRole } from "../../enum";

const dateString = "2023-05-01"; // Example date string
const deadline = new Date(dateString);

export interface IEmployeesTakingSurvey {
  acceptanceStatus: "Pending" | "Accepted" | "Declined";
  isSurveyComplete: boolean;
  employee: User;
}

const initialState: ISurveypack = {
  _id: "",
  createdAt: new Date(),
  personBeingSurveyed: "",
  survey: [],
  employeesTakingSurvey: [],
  deadline: deadline,
  status: SurveyPackStatus.OPEN,
  manager: [],
  managerapproved: false,
  hrapproved: false,
};

export const fetchSurveyPack = createAsyncThunk(
  "surveyPack/fetchSurveyPack",
  async () => {
    const response = await axios.get("http://localhost:5010/api/v1/surveyPack");
    return response.data;
  }
);

export const updateSurveyPack = createAsyncThunk(
  "surveyPack/updateSurveyPack",
  async (updatedSurveyPack: ISurveypack) => {
    const response = await axios.patch(
      `http://localhost:5010/api/v1/surveyPack/${updatedSurveyPack._id}`,
      updatedSurveyPack
    );
    return response.data;
  }
);

export const removeSurveyPackAsync = createAsyncThunk(
  "surveyPack/removeSurveyPack",
  async (surveyPackId: string) => {
    await axios.delete(
      `http://localhost:5010/api/v1/surveyPack/${surveyPackId}`
    );
    return surveyPackId;
  }
);

const surveyPackSlice = createSlice({
  name: "surveyPack",
  initialState,
  reducers: {
    setSurveyPack: (state, action: PayloadAction<ISurveypack>) => {
      return action.payload;
    },
    updatePersonBeingSurveyed: (state, action: PayloadAction<string>) => {
      state.personBeingSurveyed = action.payload;
    },
    updateEmployeesTakingSurvey: (
      state,
      action: PayloadAction<IParticipant[]>
    ) => {
      state.employeesTakingSurvey = action.payload;
    },

    updateDeadline: (state, action: PayloadAction<Date>) => {
      state.deadline = action.payload;
    },
    updateStatus: (state, action: PayloadAction<SurveyPackStatus>) => {
      state.status = action.payload;
    },
    updateManager: (state, action: PayloadAction<IEmployee[]>) => {
      state.manager = action.payload;
    },
    updateManagerApproved: (state, action: PayloadAction<boolean>) => {
      state.managerapproved = action.payload;
    },
    updateHrApproved: (state, action: PayloadAction<boolean>) => {
      state.hrapproved = action.payload;
    },
    removeSurveyPack: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSurveyPack.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(updateSurveyPack.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(removeSurveyPackAsync.fulfilled, () => {
      return initialState;
    });
  },
});

export const {
  setSurveyPack,
  updatePersonBeingSurveyed,
  updateEmployeesTakingSurvey,
  updateDeadline,
  updateStatus,
  updateManager,
  updateManagerApproved,
  updateHrApproved,
  removeSurveyPack,
} = surveyPackSlice.actions;

export default surveyPackSlice.reducer;
