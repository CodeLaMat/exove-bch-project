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
      console.log("Set surveyPackManager worked");
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
export default surveyPacksSlice.reducer;
