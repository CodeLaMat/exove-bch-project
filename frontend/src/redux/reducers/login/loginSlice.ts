import { UserRole } from "../../../enum";

export interface LoginState {
  isAuthenticated: boolean;
  selectedRole: UserRole;
}

export const initialState: LoginState = {
  isAuthenticated: false,
  selectedRole: UserRole.User,
};

export interface SetIsAuthenticatedAction {
  type: "SET_IS_AUTHENTICATED";
  payload: boolean;
}

export interface SetSelectedRoleAction {
  type: "SET_SELECTED_ROLE";
  payload: UserRole;
}

export type LoginAction = SetIsAuthenticatedAction | SetSelectedRoleAction;

export function loginSlice(
  state: LoginState = initialState,
  action: LoginAction
): LoginState {
  switch (action.type) {
    case "SET_IS_AUTHENTICATED":
      return { ...state, isAuthenticated: action.payload };
    case "SET_SELECTED_ROLE":
      return { ...state, selectedRole: action.payload };
    default:
      return state;
  }
}

export { initialState as appInitialState };
