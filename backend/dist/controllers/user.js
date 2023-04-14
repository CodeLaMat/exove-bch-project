"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneUser = exports.getAllUsers = exports.ldapLogin = exports.login = void 0;
const user_1 = __importDefault(require("../models/user"));
const errors_1 = require("../errors");
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ldap = __importStar(require("ldapjs"));
console.log("user.ts activated");
const createNewClient = () => {
    const client = ldap.createClient({
        url: 'ldap://localhost:389',
    });
    console.log("client", client);
    return client;
};
const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("login with ", email);
    if (!email || !password) {
        throw new errors_1.BadRequestError("Please provide your name and password");
    }
    const user = await user_1.default.findOne({ email });
    if (!user) {
        throw new errors_1.UnauthenticatedError("Invalid Credentials");
    }
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role,
    };
    const token = jsonwebtoken_1.default.sign(payload, `${process.env.JWT_SECRET}`, {
        expiresIn: "2d",
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ user: { name: user.displayName }, token });
};
exports.login = login;
const ldapLogin = async (req, res) => {
    const { username, password } = req.body;
    console.log(`${username} is trying to login with ${password} as a pwd`);
    const client = createNewClient();
    const bindDN = `uid=${username},ou=People,dc=test,dc=com`;
    client.bind(bindDN, password, (err) => {
        if (err) {
            console.error(err);
            res.status(401).send('Authentication failed');
            return;
        }
    });
    const searchOptions = {
        scope: 'sub',
        filter: `(&(uid=${username})(objectClass=posixAccount))`,
        attributes: ['cn', 'memberOf', 'gidNumber', 'description', 'mail',],
    };
    client.search(`uid=${username},ou=People,dc=test,dc=com`, searchOptions, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving user info');
            return;
        }
        const userAttributes = [];
        result.on('searchEntry', (entry) => {
            userAttributes.push(entry.object);
        });
        result.on('end', () => {
            console.log("authentication successfull");
            const userData = userAttributes[0];
            const payload = {
                user: {
                    role: userData.description,
                    name: userData.cn,
                    email: userData.mail,
                },
            };
            const token = jsonwebtoken_1.default.sign(payload, `${process.env.JWT_SECRET}`, {
                expiresIn: "2d",
            });
            res.status(200).send({
                message: 'Authentication successful',
                user: userAttributes[0],
                groups: userAttributes[0].memberOf,
                token: token,
            });
        });
    });
};
exports.ldapLogin = ldapLogin;
const getAllUsers = async (req, res) => {
    const users = await user_1.default.find({}).sort("role");
    res.status(http_status_codes_1.StatusCodes.OK).json({ users, count: users.length });
};
exports.getAllUsers = getAllUsers;
const getOneUser = async (req, res) => {
    const { params: { id: userId }, } = req;
    const user = await user_1.default.findOne({ _id: userId });
    if (!user) {
        throw new errors_1.NotFoundError(`No user with id ${userId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ user });
};
exports.getOneUser = getOneUser;
