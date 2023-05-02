"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const isCustomAPIError = (err) => {
    return err instanceof errors_1.CustomAPIError;
};
const errorHandlerMiddleware = (err, req, res, next) => {
    if (isCustomAPIError(err) && err.statusCode !== undefined) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    return res
        .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "Something went wrong, please try again" });
};
exports.default = errorHandlerMiddleware;
