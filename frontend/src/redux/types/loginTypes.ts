import { UserRole } from "../../enum";

export interface LoginState {
  isAuthenticated: boolean;
  selectedRole: UserRole;
  userName: string;
  surName: string;
  email: string;
}

export interface SetIsAuthenticatedAction {
  type: "SET_IS_AUTHENTICATED";
  payload: boolean;
}

export type LoginAction = SetIsAuthenticatedAction;
