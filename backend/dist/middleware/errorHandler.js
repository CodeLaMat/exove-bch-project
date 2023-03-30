"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = async (err, req, res, next) => {
    return res
        .status(500)
        .json({ msg: "something went wrong, please try again" });
};
exports.default = errorHandler;
