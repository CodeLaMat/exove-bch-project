import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  Reducer,
} from "@reduxjs/toolkit";
// import userReducer from "../redux/reducers/user/userSlice";
import surveyReducer from "./reducers/survey/surveySlice";
import {
  loginReducer,
  LoginState,
  LoginAction,
} from "./reducers/login/loginReducer";

type AppAction =
  | LoginAction
  | Action<string>
  | { payload: unknown; type: string };

const rootReducer: Reducer = combineReducers({
  // user: userReducer,
  survey: surveyReducer,
  loginUser: loginReducer,
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
