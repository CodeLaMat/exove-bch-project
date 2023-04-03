import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";

interface UserState {
  email: string;
  password: string;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  email: "",
  password: "",
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    authenticateUser: (state) => {
      state.isAuthenticated = true;
    },
    unauthenticateUser: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { setEmail, setPassword, authenticateUser, unauthenticateUser } =
  userSlice.actions;

export const selectUser = (state: RootState) => state.user;
