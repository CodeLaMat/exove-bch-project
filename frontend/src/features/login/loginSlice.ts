import { UserRole } from "../../enum";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ILogin } from "../../types/loginTypes";

import axios from "axios";
import { URL } from "../../enum";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LdapLoginCredentials {
  username: string;
  password: string;
}

const isLoggedInString = sessionStorage.getItem("isAuthenticated");

const initialState: ILogin = {
  isAuthenticated: Boolean(isLoggedInString) || false,
  selectedRole:
    (sessionStorage.getItem("userRole") as UserRole) || UserRole.User,
  userName: "",
  surName: "",
  email: sessionStorage.getItem("userEmail"),
};

export const loginSlice = createSlice({
  name: "loginUser",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      sessionStorage.setItem("token", action.payload ? "true" : "");
      state.isAuthenticated = action.payload;
    },
    setSelectedRole: (state, action: PayloadAction<UserRole>) => {
      sessionStorage.setItem("userRole", action.payload);
      state.selectedRole = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setSurName: (state, action: PayloadAction<string>) => {
      state.surName = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const loginAsync = createAsyncThunk(
  "login/loginAsync",
  async (credentials: LoginCredentials, { dispatch }) => {
    try {
      const response = await axios.post(URL.LOGIN_URL, credentials);
      const token = response.data.user;
      console.log("Logintoken", response.data.user);
      sessionStorage.setItem("token", token);
    } catch (error) {
      throw new Error("Failed to authenticate user");
    }
  }
);
export const ldspLoginAsync = createAsyncThunk(
  "login/loginAsync",
  async (credentials: LdapLoginCredentials, { dispatch }) => {
    try {
      const response = await axios.post(URL.LOGIN_URL, credentials);
      const token = response.data.token;
      console.log("Logintoken", response.data.token);
      sessionStorage.setItem("token", token);
    } catch (error) {
      throw new Error("Failed to authenticate user");
    }
  }
);

export const {
  setIsAuthenticated,
  setSelectedRole,
  setUserName,
  setSurName,
  setUserEmail,
} = loginSlice.actions;

export default loginSlice.reducer;

export { initialState as appInitialState };
