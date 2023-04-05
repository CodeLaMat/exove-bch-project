"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.UnauthenticatedError = exports.BadRequestError = exports.CustomAPIError = void 0;
const customError_1 = __importDefault(require("./customError"));
exports.CustomAPIError = customError_1.default;
const BadRequest_1 = __importDefault(require("./BadRequest"));
exports.BadRequestError = BadRequest_1.default;
const Unauthenticated_1 = __importDefault(require("./Unauthenticated"));
exports.UnauthenticatedError = Unauthenticated_1.default;
const NotFound_1 = __importDefault(require("./NotFound"));
exports.NotFoundError = NotFound_1.default;
