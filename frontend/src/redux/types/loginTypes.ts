import { UserRole } from "../../enum";

export interface LoginState {
  isAuthenticated: boolean;
  selectedRole: UserRole;
}

export interface SetIsAuthenticatedAction {
  type: "SET_IS_AUTHENTICATED";
  payload: boolean;
}

export interface SetSelectedRoleAction {
  type: "SET_SELECTED_ROLE";
  payload: UserRole;
}

export type LoginAction = SetIsAuthenticatedAction | SetSelectedRoleAction;
