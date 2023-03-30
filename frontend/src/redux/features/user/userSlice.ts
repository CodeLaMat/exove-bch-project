import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface UserState {
  email: string;
  role: "employee" | "hr" | "manager";
}

const initialState: UserState = {
  email: "",
  role: "employee",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setUserRole: (
      state,
      action: PayloadAction<"employee" | "hr" | "manager">
    ) => {
      state.role = action.payload;
    },
  },
});

export const { setUserEmail, setUserRole } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
