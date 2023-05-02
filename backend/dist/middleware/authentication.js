"use strict";
// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import { UnauthenticatedError } from "../errors";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizePermissions = exports.authenticateUser = void 0;
const errors_1 = require("../errors");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
let userRole = "";
const authenticateUser = async (req, res, next) => {
    // const token = req.signedCookies.token;
    // console.log("cookie",req.signedCookies.token);
    // if (!token) {
    //   throw new UnauthenticatedError("Authentication invalid");
    // }
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        throw new errors_1.UnauthenticatedError("Authentication invalid");
    }
    const token = authorizationHeader.substring(7);
    try {
        const decodedToken = (0, jwt_decode_1.default)(token);
        userRole = decodedToken.user.role[0];
        // const { userId, name, email, role } = isTokenValid({ token }) as UserType;
        // req.user = { userId, name, email, role };
        // console.log("req.user", req.user);
        next();
    }
    catch (error) {
        throw new errors_1.UnauthenticatedError("Authentication failed");
        //res.status(401).send("Authentication failed");
    }
};
exports.authenticateUser = authenticateUser;
const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(userRole)) {
            throw new errors_1.UnauthorizedError("Unauthorized to access this route");
        }
        next();
    };
};
exports.authorizePermissions = authorizePermissions;
