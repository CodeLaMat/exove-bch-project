"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createTokenUser = (user) => {
    return {
        userId: user._id,
        name: user.displayName,
        email: user.email,
        role: user.role,
    };
};
exports.default = createTokenUser;
