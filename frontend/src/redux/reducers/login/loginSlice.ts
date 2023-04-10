import { UserRole } from "../../../enum";
import { LoginAction, LoginState } from "../../types/loginTypes";

export const initialState: LoginState = {
  isAuthenticated: localStorage.getItem("token") !== null,
  selectedRole:
    (localStorage.getItem("userRole") as UserRole.HR) ||
    UserRole.Manager ||
    UserRole.User,
};

export function loginSlice(
  state: LoginState = initialState,
  action: LoginAction
): LoginState {
  switch (action.type) {
    case "SET_IS_AUTHENTICATED":
      localStorage.setItem("token", action.payload ? "true" : "");
      return { ...state, isAuthenticated: action.payload };
    case "SET_SELECTED_ROLE":
      localStorage.setItem("userRole", action.payload);
      return { ...state, selectedRole: action.payload };
    default:
      return state;
  }
}

export { initialState as appInitialState };
