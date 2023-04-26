import { UserRole } from "../enum";

interface IUser {
  id: number;
  userName: string;
  surName: string;
  role: string;
  email: string;
}

export interface ILogin {
  isAuthenticated: boolean;
  selectedRole: UserRole;
  userName: string;
  surName: string;
  email: string | null;
  userData: IUser[] | null;
}

const isLoggedInString = sessionStorage.getItem("isAuthenticated");

const initialState: ILogin = {
  isAuthenticated: Boolean(isLoggedInString) || false,
  selectedRole: sessionStorage.getItem("userRole") as UserRole || UserRole.User,
  userName: "",
  surName: "",
  email: sessionStorage.getItem("userEmail"),
  userData: null,
};

export { initialState as appInitialState };