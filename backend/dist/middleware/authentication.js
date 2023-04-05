"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../errors");
const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new errors_1.UnauthenticatedError("Authentication Invalid");
    }
    const token = authHeader && authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRET}`);
        req.user = {
            userId: decoded._id,
            email: decoded.email,
            role: decoded.role,
        };
        next();
    }
    catch (error) {
        throw new errors_1.UnauthenticatedError("Authentication invalid");
    }
};
exports.default = auth;
