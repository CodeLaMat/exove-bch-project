import { UserRole } from "../../enum";

export interface ILogin {
  isAuthenticated: boolean;
  selectedRole: UserRole;
  userName: string;
  surName: string;
  email: string;
}
