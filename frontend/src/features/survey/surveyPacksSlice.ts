import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  ISurveypack,
  IParticipant,
  User,
  ISurveyPacks,
} from "../../types/dataTypes";
import { Dispatch, Action } from "redux";
import { IEmployee } from "../../types/userTypes";
import { SurveyPackStatus } from "../../types/dataTypes";
import surveyPackService from "../../api/surveyPack";
import Cookies from "js-cookie";

// const dateString = "2023-05-01"; // Example date string
// const deadline = new Date(dateString);

// const storedSurveyPacksString = Cookies.get("storedSurveyPacks");
// const storedSurveyPacks = storedSurveyPacksString
//   ? JSON.parse(storedSurveyPacksString)
//   : [];

const initialState: ISurveyPacks = {
  surveyPacks: [],
};

export interface IEmployeesTakingSurvey {
  acceptanceStatus: "Pending" | "Accepted" | "Declined";
  isSurveyComplete: boolean;
  employee: User;
}

// const initialState: ISurveypack = {
//   _id: "",
//   createdAt: new Date(),
//   personBeingSurveyed: "",
//   survey: [],
//   employeesTakingSurvey: [],
//   deadline: deadline,
//   status: SurveyPackStatus.OPEN,
//   manager: [],
//   managerapproved: false,
//   hrapproved: false,
// };

// export const fetchSurveyPack = createAsyncThunk(
//   "surveyPack/fetchSurveyPack",
//   async () => {
//     const response = await axios.get("http://localhost:5010/api/v1/surveyPack");
//     return response.data;
//   }
// );

// export const updateSurveyPack = createAsyncThunk(
//   "surveyPack/updateSurveyPack",
//   async (updatedSurveyPack: ISurveypack) => {
//     const response = await axios.patch(
//       `http://localhost:5010/api/v1/surveyPack/${updatedSurveyPack._id}`,
//       updatedSurveyPack
//     );
//     return response.data;
//   }
// );

// export const removeSurveyPackAsync = createAsyncThunk(
//   "surveyPack/removeSurveyPack",
//   async (surveyPackId: string) => {
//     await axios.delete(
//       `http://localhost:5010/api/v1/surveyPack/${surveyPackId}`
//     );
//     return surveyPackId;
//   }
// );

const surveyPacksSlice = createSlice({
  name: "surveyPacks",
  initialState,
  reducers: {
    getAllSurveyPacks: (state, action: PayloadAction<ISurveypack[]>) => {
      state.surveyPacks = action.payload;
      // Cookies.set("storedSurveyPacks", JSON.stringify(action.payload));
    },
  },
});

export const initialiseSurveyPacks = () => {
  return async (dispatch: Dispatch<Action>) => {
    const surveyPacks = await surveyPackService.getAll();
    dispatch(getAllSurveyPacks(surveyPacks));
  };
};

export const { getAllSurveyPacks } = surveyPacksSlice.actions;

export default surveyPacksSlice.reducer;
