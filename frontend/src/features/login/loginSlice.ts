import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { ILogin } from "../../types/loginTypes";
import { IUser } from "../../types/loginTypes";
import axios from "axios";
import { URL } from "../../enum";
import Cookies from "js-cookie";

interface LdapLoginCredentials {
  username: string;
  password: string;
}

const checkAuthStatus = () => {
  const token = Cookies.get("token");
  if (token) {
    const decodedToken: { [key: string]: any } = jwt_decode(token);
    const userData = Object.values(decodedToken) as IUser[];
    const expirationTime = Number(userData[2]);
    const currentTime = Math.floor(Date.now() / 1000);
    if (expirationTime > currentTime) {
      return { userData, isAuthenticated: true };
    }
  }
  return { userData: [], isAuthenticated: false };
};

const removeExpiredToken = () => {
  const token = Cookies.get("token");
  if (token) {
    const decodedToken: { [key: string]: any } = jwt_decode(token);
    const expirationTime = Number(decodedToken.exp);
    const currentTime = Math.floor(Date.now() / 1000);
    if (expirationTime <= currentTime) {
      Cookies.remove("token");
    }
  }
};
removeExpiredToken();

const initialState: ILogin = {
  isAuthenticated: checkAuthStatus().isAuthenticated,
  userData: checkAuthStatus().userData,
};

export const loginSlice = createSlice({
  name: "loginUser",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setUserData: (state, action: PayloadAction<IUser[]>) => {
      state.userData = action.payload;
    },
  },
});

export const ldspLoginAsync = createAsyncThunk(
  "login/loginAsync",
  async (credentials: LdapLoginCredentials, { dispatch }) => {
    try {
      const response = await axios.post(URL.LOGIN_URL, credentials);
      const token = response.data.token;
      Cookies.set("token", token);
    } catch (error) {
      throw new Error("Failed to authenticate user");
    }
  }
);

export const { setIsAuthenticated, setUserData } = loginSlice.actions;

export default loginSlice.reducer;
