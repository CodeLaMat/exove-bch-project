<<<<<<< HEAD
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
=======
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  // ISurveypack,
  IParticipant,
  User,
  ISurveyPacks,
} from "../../types/dataTypes";
import { Dispatch, Action } from "redux";
import { IEmployee } from "../../types/userTypes";
import { SurveyPackStatus } from "../../types/dataTypes";
import surveyPackService from "../../api/surveyPack";
import axios from "axios";
import { ISurvey } from "../../types/dataTypes";

export interface ISurveypack {
  _id: string;
  createdAt: Date;
  personBeingSurveyed: string;
  survey: ISurvey[];
  employeesTakingSurvey: IParticipant[];
  deadline: Date;
  status: SurveyPackStatus;
  manager: string;
  managerapproved: boolean;
  hrapproved: boolean;
}

const dateString = "2023-05-01"; // Example date string
const deadline = new Date(dateString);

const storedSurveyPacksString = sessionStorage.getItem("storedSurveyPacks");
const storedSurveyPacks = storedSurveyPacksString
  ? JSON.parse(storedSurveyPacksString)
  : [];

const initialState: ISurveyPacks = {
  surveyPacks: storedSurveyPacks,
};

export interface IEmployeesTakingSurvey {
  acceptanceStatus: "Pending" | "Approved" | "Declined";
  isSurveyComplete: boolean;
  employee: User;
}

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

const surveyPacksSlice = createSlice({
  name: "surveyPacks",
>>>>>>> 2486a3a (SurveyPack and surveyPacks slices created. Fetached surveypacks)
  initialState,
  reducers: {
    getAllSurveyPacks: (state, action: PayloadAction<ISurveypack[]>) => {
      state.surveyPacks = action.payload;
      sessionStorage.setItem(
        "storedSurveyPacks",
        JSON.stringify(action.payload)
      );
    },
<<<<<<< HEAD
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
=======
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
    // sessionStorage.setItem("storedSurveyPacks", surveyPacks);
    dispatch(getAllSurveyPacks(surveyPacks));
  };
};
>>>>>>> 2486a3a (SurveyPack and surveyPacks slices created. Fetached surveypacks)

export const { getAllSurveyPacks, updatePersonBeingSurveyed } =
  surveyPacksSlice.actions;

export default surveyPacksSlice.reducer;
