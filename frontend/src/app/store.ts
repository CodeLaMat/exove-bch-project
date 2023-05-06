import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  Reducer,
} from "@reduxjs/toolkit";
import employeesSlice from "../features/user/employeesSlice";
import loginSlice from "../features/login/loginSlice";
import surveySlice from "../features/survey/surveySlice";
import surveysSlice from "../features/survey/surveysSlice";
import surveyPacksSlice from "../features/survey/surveyPacksSlice";
import userSlice from "../features/user/userSlice";
import questionSlice from "../features/form/QuestionSlice";

type AppAction = Action<string> | { payload: unknown; type: string };

const rootReducer: Reducer = combineReducers({
  loginUser: loginSlice,
  user: userSlice,
  employees: employeesSlice,
  survey: surveySlice,
  surveys: surveysSlice,
  question: questionSlice,
  surveyPacks: surveyPacksSlice,
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
