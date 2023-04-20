"use strict";
// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import { UnauthenticatedError } from "../errors";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizePermissions = exports.authenticateUser = void 0;
const jwt_1 = require("../util/jwt");
const errors_1 = require("../errors");
const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token;
    if (!token) {
        throw new errors_1.UnauthenticatedError("Authentication invalid");
    }
    try {
        const { userId, name, email, role } = (0, jwt_1.isTokenValid)({ token });
        req.user = { userId, name, email, role };
        next();
    }
    catch (error) {
        throw new errors_1.UnauthenticatedError("Authentication invalid");
    }
};
exports.authenticateUser = authenticateUser;
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
const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !roles.includes(user.role)) {
            throw new errors_1.UnauthorizedError("Unauthorized to access this route");
        }
        next();
    };
};
exports.authorizePermissions = authorizePermissions;
