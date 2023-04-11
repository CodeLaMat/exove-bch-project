//import { Dispatch, Action } from "redux";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import employeesService from "../../services/employees";
import { User } from "../../types/dataTypes";
import {
  addUserToLocalStorage,
  getTokenFromLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../../utils/localstroage";
import customFetch from "../../../utils/axios";

// export interface Employee {
//   id: string;
//   firstName: string;
//   surname: string;
//   email: string;
//   displayName: string;
//   personal: { age: number; gender: string };
//   about: { bio: string };
//   work: {
//     reportsTo: {
//       id: number;
//       firstName: string;
//       surname: string;
//       email: string;
//     };
//     title: string;
//     department: string;
//     site: string;
//     startDate: string;
//   };
// }

// export interface EmployeesData {
//   employees: Employee[];
// }

interface UserState {
  isLoading: boolean;
  user: User | null;
  error: string | null;
}

// const initialState: EmployeesData = {
//   employees: [],
// };

const initialState: UserState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
  error: null,
};

const token = getTokenFromLocalStorage();

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: { email: string; password: string }, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/login", user);
      return resp.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "user/getAllUser",
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get("/user", {
        headers: {
          authorization: `Bearer ` + token,
        },
      });
      return resp.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logoutUser: (state, { payload }) => {
      state.user = null;
      removeUserFromLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = "something wenth wrong";
    });
    builder.addCase(getAllUsers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Failed to fetch users";
    });
  },
});

// const employeeSlice: Slice<EmployeesData> = createSlice({
//   name: "employees",
//   initialState,
//   reducers: {
//     getEmployees: (state, action: PayloadAction<Employee[]>) => {
//       state.employees = action.payload;
//     },
//   },
// });

// export const initialiseEmployees = () => {
//   return async (dispatch: Dispatch<Action>) => {
//     const employees = await employeesService.getAll();
//     dispatch(getEmployees(employees));
//   };
// };

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
