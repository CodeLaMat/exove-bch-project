"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getOneUser = exports.getAllUsers = exports.register = exports.login = void 0;
const login = async (req, res) => {
    res.send("user login ");
};
exports.login = login;
const register = async (req, res) => {
    res.send("user register");
};
exports.register = register;
const getAllUsers = async (req, res) => {
    res.send("get All users");
};
exports.getAllUsers = getAllUsers;
const getOneUser = async (req, res) => {
    res.send("show stats");
};
exports.getOneUser = getOneUser;
const updateUser = async (req, res) => {
    res.send("show stats");
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    res.send("show stats");
};
exports.deleteUser = deleteUser;
