"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showCurrentUser = exports.logout = exports.getOneUser = exports.getAllUsers = exports.login = void 0;
const user_1 = __importDefault(require("../models/user"));
const errors_1 = require("../errors");
const http_status_codes_1 = require("http-status-codes");
//import jwt from "jsonwebtoken";
//import bcrypt from "bcryptjs";
const util_1 = require("../util");
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new errors_1.BadRequestError("Please provide your name and password");
    }
    const user = await user_1.default.findOne({ email });
    if (!user) {
        throw new errors_1.UnauthenticatedError("Invalid Credentials");
    }
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   throw new UnauthenticatedError("Invalid Credentials");
    // }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new errors_1.UnauthenticatedError("Invalid Credentials");
    }
    // const tokenUser = {
    //   userId: user._id,
    //   name: user.displayName as string,
    //   email: user.email,
    //   role: user.role,
    // };
    const tokenUser = (0, util_1.createTokenUser)(user);
    (0, util_1.attachCookiesToResponse)({ res, user: tokenUser });
    // const payload: JwtPayload = {
    //   _id: user._id,
    //   email: user.email,
    //   role: user.role,
    // };
    // const token = jwt.sign(payload, `${process.env.JWT_SECRET}`, {
    //   expiresIn: `${process.env.JWT_LIFETIME}`,
    // });
    // const oneDay = 1000 * 60 * 60 * 24;
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   expires: new Date(Date.now() + oneDay),
    //   secure: process.env.NODE_ENV === "production",
    //   signed: true,
    // });
    res.status(http_status_codes_1.StatusCodes.OK).json({
        user: tokenUser,
    });
};
exports.login = login;
const logout = async (req, res) => {
    res.cookie("token", "logout", {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
    });
    return res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "user logout" });
};
exports.logout = logout;
const getAllUsers = async (req, res) => {
    const queryParams = req.query;
    const search = queryParams.search || "";
    const query = {
        $or: [
            { firstName: new RegExp(search, "i") },
            { surname: new RegExp(search, "i") },
        ],
    };
    let result = user_1.default.find(query);
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    const users = await result;
    const totalUsers = await user_1.default.countDocuments(query);
    const numOfPages = Math.ceil(totalUsers / limit);
    res.status(http_status_codes_1.StatusCodes.OK).json({ users, totalUsers, numOfPages });
};
exports.getAllUsers = getAllUsers;
const getOneUser = async (req, res) => {
    const { params: { id: userId }, } = req;
    const user = await user_1.default.findOne({ _id: userId });
    if (!user) {
        throw new errors_1.NotFoundError(`No user with id ${userId}`);
    }
    (0, util_1.checkPermissions)(req.user, user._id);
    res.status(http_status_codes_1.StatusCodes.OK).json({ user });
};
exports.getOneUser = getOneUser;
const showCurrentUser = async (req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).json({ user: req.user });
};
exports.showCurrentUser = showCurrentUser;
