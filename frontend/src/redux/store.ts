import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  Reducer,
} from "@reduxjs/toolkit";
import surveyReducer from "./reducers/survey/surveySlice";
import employeeSlice from "./reducers/user/userListSlice";
import { loginSlice, LoginAction } from "./reducers/login/loginSlice";

type AppAction =
  | LoginAction
  | Action<string>
  | { payload: unknown; type: string };

const rootReducer: Reducer = combineReducers({
  survey: surveyReducer,
  loginUser: loginSlice,
  employees: employeeSlice,
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
