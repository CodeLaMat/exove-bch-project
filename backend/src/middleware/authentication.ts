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

interface User {
  userId: string;
  name: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const authenticateUser = async (
  req: Request & { user?: User },
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  try {
    const { userId, name, email, role } = isTokenValid({ token });
    req.user = { userId, name, email, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

// const authorizePermissions = (
//   req: Request & { user?: User },
//   res: Response,
//   next: NextFunction
// ) => {
//   console.log(req.user);
//   if (req.user?.role !== "hr") {
//     throw new UnauthorizedError("Unauthorized to access this route");
//   }
//   next();
// };

const authorizePermissions = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user || !roles.includes(user.role)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};

export { authenticateUser, authorizePermissions };
