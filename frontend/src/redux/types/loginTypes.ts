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

export interface PoginProfileProps {
  imageUrl: string;
  userName: string;
  pageTitle: string;
  userRole: string; // new prop for the user's role
}
