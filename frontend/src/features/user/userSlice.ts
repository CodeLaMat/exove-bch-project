import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  role: string;
  name: string;
  email: string;
  phoneNumber: string;
  groupId: string;
  imagePath: string;
}

interface UserState {
  userData: UserData[];
  isLoading: boolean;
  isAuthenticated: boolean;
  userToken: string;
}

const initialState: UserState = {
  userData: [],
  isLoading: false,
  isAuthenticated: false,
  userToken: "",
};

export const userSlice = createSlice({
  name: "userData",
  initialState,

  reducers: {
    loadUserData: (state, action: PayloadAction<UserData[]>) => {
      state.userData = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.userToken = action.payload;
    },
  },
});

export const { loadUserData, setLoading, setAuthenticated, setToken } =
  userSlice.actions;

export const selectUserInfo = (state: { user: UserState }) =>
  state.user.userData;

export default userSlice.reducer;
