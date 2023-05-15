import { ObjectId } from "mongodb";
import { UnauthorizedError } from "../errors";
import User from "../models/user";
import { UserRoles } from "../types/dataTypes";

const checkPermissions = (
  requestUser: { role: UserRoles; userId: ObjectId | string },
  resourceUserId: string
): void => {
  if (requestUser.role === "hr") return;
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new UnauthorizedError("Not authorized to access this route");
};

export default checkPermissions;
