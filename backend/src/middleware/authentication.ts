import { Request, Response, NextFunction } from "express";
import { isTokenValid } from "../util/jwt";
import { UnauthenticatedError, UnauthorizedError } from "../errors";
import User from "../models/user";
import { UserRoles } from "../types/dataTypes";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { ObjectId } from "mongodb";
import { CustomRequest, LdapUser } from "../controllers/user";

let userRole: string = "";

interface UserType {
  userId: ObjectId | string;
  name: string;
  email: string;
  role: UserRoles;
}
declare global {
  namespace Express {
    interface Request {
      user: LdapUser;
    }
  }
}

const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  const token = authorizationHeader.substring(7);

  try {
    const decodedToken: { [key: string]: any } = jwt_decode(token!);

    const { userId, name, email, role, phoneNumber, groupId, imagePath } =
      decodedToken.user as LdapUser;
    req.user = { userId, name, email, role, phoneNumber, groupId, imagePath };

    //userRole = decodedToken.user.role[0];
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication failed");
    //res.status(401).send("Authentication failed");
  }
};
// const authenticateUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.signedCookies.token;
//   if (!token) {
//     throw new UnauthenticatedError("Authentication invalid");
//   }
//   try {
//     const { userId, name, email, role } = isTokenValid({ token }) as UserType;
//     req.user = { userId, name, email, role };
//     next();
//   } catch (error) {
//     throw new UnauthenticatedError("Authentication failed");
//   }
// };

const authorizePermissions = (...roles: string[]) => {
  return (
    req: Request & { user: LdapUser },
    res: Response,
    next: NextFunction
  ) => {
    if (!roles.includes(req.user.role[0])) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};

export { authenticateUser, authorizePermissions };
