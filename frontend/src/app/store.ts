import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  Reducer,
} from "@reduxjs/toolkit";
import employeeSlice from "../features/user/userListSlice";
import loginSlice from "../features/login/loginSlice";
import surveySlice from "../features/survey/surveySlice";
import surveysSlice from "../features/survey/surveysSlice";
// import { LoginAction } from "./types/loginTypes";
// import surveyPackSlice from "../features/survey/createSurveySlice";
import userSlice from "../features/user/userSlice";

type AppAction = Action<string> | { payload: unknown; type: string };

const rootReducer: Reducer = combineReducers({
  loginUser: loginSlice,
  user: userSlice,
  employees: employeeSlice,
  survey: surveySlice,
  surveys: surveysSlice,
  // surveyPack: surveyPackSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AppAction
>;
