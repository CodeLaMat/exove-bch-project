import { UnauthorizedError } from "../errors";
import User from "../models/user";

const checkPermissions = (
  requestUser: { role: User["role"]; userId: User["_id"] },
  resourceUserId: string
): void => {
  if (requestUser.role === "hr") return;
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new UnauthorizedError("Not authorized to access this route");
};

export default checkPermissions;
