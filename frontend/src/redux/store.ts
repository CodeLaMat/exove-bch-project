import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  Reducer,
} from "@reduxjs/toolkit";
import employeeSlice from "./reducers/user/userListSlice";
import { loginSlice } from "./reducers/login/loginSlice";
import surveySlice from "./reducers/form/formSlice";
import surveysSlice from "./reducers/form/formSlice";
import { LoginAction } from "./types/loginTypes";

type AppAction =
  | LoginAction
  | Action<string>
  | { payload: unknown; type: string };

const rootReducer: Reducer = combineReducers({
  loginUser: loginSlice,
  employees: employeeSlice,
  survey: surveySlice,
  surveys: surveysSlice,
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
