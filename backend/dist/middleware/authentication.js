"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizePermissions = exports.authenticateUser = void 0;
const errors_1 = require("../errors");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
let userRole = "";
const authenticateUser = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        throw new errors_1.UnauthenticatedError("Authentication invalid");
    }
    const token = authorizationHeader.substring(7);
    try {
        const decodedToken = (0, jwt_decode_1.default)(token);
        const { userId, name, email, role, phoneNumber, groupId, imagePath } = decodedToken.user;
        req.user = { userId, name, email, role, phoneNumber, groupId, imagePath };
        //userRole = decodedToken.user.role[0];
        next();
    }
    catch (error) {
        throw new errors_1.UnauthenticatedError("Authentication failed");
        //res.status(401).send("Authentication failed");
    }
};
exports.authenticateUser = authenticateUser;
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
const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role[0])) {
            throw new errors_1.UnauthorizedError("Unauthorized to access this route");
        }
        next();
    };
};
exports.authorizePermissions = authorizePermissions;
