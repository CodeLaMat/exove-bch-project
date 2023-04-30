import { UserRole } from "../enum";

export interface IUser {
  email: string[];
  groupId: string[];
  imagePath: string[];
  name: string[];
  phoneNumber: string[];
  role: string[];
}

export interface ILogin {
  isAuthenticated: boolean;
  userData: IUser[] | null;
}
