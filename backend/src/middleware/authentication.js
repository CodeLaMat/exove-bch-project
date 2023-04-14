"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var errors_1 = require("../errors");
var auth = function (req, res, next) {
    var authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new errors_1.UnauthenticatedError("Authentication Invalid");
    }
    var token = authHeader && authHeader.split(" ")[1];
    try {
        var decoded = jsonwebtoken_1.default.verify(token, "".concat(process.env.JWT_SECRET));
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
