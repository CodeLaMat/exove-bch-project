// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import { UnauthenticatedError } from "../errors";

// interface JwtPayload {
//   _id: string;
//   email: string;
//   role: string;
// }

// interface AuthRequest extends Request {
//   user?: { userId: string; email: string; role: string };
// }

// const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     throw new UnauthenticatedError("Authentication Invalid");
//   }

//   const token = authHeader && authHeader.split(" ")[1];
//   try {
//     const decoded: JwtPayload = jwt.verify(
//       token,
//       `${process.env.JWT_SECRET}`
//     ) as JwtPayload;
//     req.user = {
//       userId: decoded._id,
//       email: decoded.email,
//       role: decoded.role,
//     };
//     next();
//   } catch (error) {
//     throw new UnauthenticatedError("Authentication invalid");
//   }
// };

// export default auth;

import { Request, Response, NextFunction } from "express";
import { isTokenValid } from "../util/jwt";
import { UnauthenticatedError, UnauthorizedError } from "../errors";
import User from "../models/user";
import { UserRoles } from "../types/dataTypes";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

let userRole: string = "";

interface UserType {
  userId: string;
  name: string;
  email: string;
  role: UserRoles;
}

declare global {
  namespace Express {
    interface Request {
      user: UserType;
    }
  }
}

const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const token = req.signedCookies.token;
  // console.log("cookie",req.signedCookies.token);
  // if (!token) {
  //   throw new UnauthenticatedError("Authentication invalid");
  // }

  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  const token = authorizationHeader.substring(7);

  try {
    const decodedToken: { [key: string]: any } = jwt_decode(token!);

    userRole = decodedToken.user.role[0];

    // const { userId, name, email, role } = isTokenValid({ token }) as UserType;
    // req.user = { userId, name, email, role };
    // console.log("req.user", req.user);
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication failed");
    //res.status(401).send("Authentication failed");
  }
};

const authorizePermissions = (...roles: string[]) => {
  return (
    req: Request & { user: UserType },
    res: Response,
    next: NextFunction
  ) => {
    if (!roles.includes(userRole)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};

export { authenticateUser, authorizePermissions };
