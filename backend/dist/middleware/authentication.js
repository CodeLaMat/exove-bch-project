"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../util/jwt");
const errors_1 = require("../errors");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const authenticateUser = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        throw new errors_1.UnauthenticatedError("Authentication invalid");
    }
    const token = authorizationHeader.substring(7);
    try {
        const decodedToken = (0, jwt_decode_1.default)(token);
        userRole = decodedToken.user.role[0];
        next();
    }
    catch (error) {
        throw new errors_1.UnauthenticatedError("Authentication failed");
        //res.status(401).send("Authentication failed");
    }
};
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
const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            if (!roles.includes(req.user.role)) {
                throw new errors_1.UnauthorizedError("Unauthorized to access this route");
            }
            next();
        }
        ;
    };
    export { authenticateUser, authorizePermissions };
};
