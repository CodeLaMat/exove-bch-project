"use strict";
// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import { UnauthenticatedError } from "../errors";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizePermissions = exports.authenticateUser = void 0;
const jwt_1 = require("../util/jwt");
const errors_1 = require("../errors");
// const authenticateUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authorizationHeader = req.headers.authorization;
//   if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
//     throw new UnauthenticatedError("Authentication invalid");
//   }
//   const token = authorizationHeader.substring(7);
//   try {
//     const decodedToken: { [key: string]: any } = jwt_decode(token!);
//     userRole = decodedToken.user.role[0];
//     next();
//   } catch (error) {
//     throw new UnauthenticatedError("Authentication failed");
//     //res.status(401).send("Authentication failed");
//   }
// };
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
        throw new errors_1.UnauthenticatedError("Authentication failed");
    }
};
exports.authenticateUser = authenticateUser;
const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new errors_1.UnauthorizedError("Unauthorized to access this route");
        }
        next();
    };
};
exports.authorizePermissions = authorizePermissions;
