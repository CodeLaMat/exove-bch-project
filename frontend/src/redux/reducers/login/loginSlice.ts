import { UserRole } from "../../../enum";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginState {
  isAuthenticated: boolean;
  selectedRole: UserRole;
  userName: string;
  surName: string;
  email: string;
}

const initialState: LoginState = {
  isAuthenticated: localStorage.getItem("token") !== null,
  selectedRole: (localStorage.getItem("userRole") as UserRole) || UserRole.User,
  userName: "",
  surName: "",
  email: "",
};

export const loginSlice = createSlice({
  name: "loginUser",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      localStorage.setItem("token", action.payload ? "true" : "");
      state.isAuthenticated = action.payload;
    },
    setSelectedRole: (state, action: PayloadAction<UserRole>) => {
      localStorage.setItem("userRole", action.payload);
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

export const {
  setIsAuthenticated,
  setSelectedRole,
  setUserName,
  setSurName,
  setUserEmail,
} = loginSlice.actions;

export default loginSlice.reducer;

export { initialState as appInitialState };
