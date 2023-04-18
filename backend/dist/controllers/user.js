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
exports.getOneUser = exports.getAllLdapUsers = exports.getAllUsers = exports.ldapLogin = exports.login = void 0;
const user_1 = __importDefault(require("../models/user"));
const errors_1 = require("../errors");
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ldap = __importStar(require("ldapjs"));
const util_1 = require("util");
const createNewClient = () => {
    const client = ldap.createClient({
        url: 'ldap://localhost:389',
    });
    console.log("client", client);
    return client;
};
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new errors_1.BadRequestError("Please provide your name and password");
    }
    const user = await user_1.default.findOne({ email });
    if (!user) {
        throw new errors_1.UnauthenticatedError("Invalid email");
    }
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   throw new UnauthenticatedError("Invalid Credentials");
    // }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new errors_1.UnauthenticatedError("Invalid password");
    }
    console.log('user', user);
    const tokenUser = {
        userId: user._id,
        email: user.email,
        role: user.role,
    };
    console.log('tokenUser', tokenUser);
    const payload = {
        userId: user._id,
        email: user.email,
        role: user.role,
    };
    const token = jsonwebtoken_1.default.sign(payload, `${process.env.JWT_SECRET}`, {
        expiresIn: `${process.env.JWT_LIFETIME}`,
    });
    console.log('token', token);
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production",
        signed: true,
    });
    // attachCookiesToResponse({ res, user: tokenUser });
    res.status(http_status_codes_1.StatusCodes.OK).json({
        user: token,
    });
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
        attributes: ['cn', 'memberOf', 'gidNumber', 'description', 'mail', 'jpegPhoto', 'telephoneNumber'],
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
                    phoneNumber: userData.telephoneNumber,
                    groupId: userData.gidNumber,
                    imagePath: userData.jpegPhoto,
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
const getAllLdapUsers = async (req, res) => {
    console.log("getting all ldap users");
    try {
        const client = createNewClient();
        const opts = {
            filter: '(objectClass=user)',
            scope: 'sub',
            attributes: ['cn', 'mail', 'memberOf']
        };
        const users = [];
        const searchAsync = (0, util_1.promisify)(client.search.bind(client));
        const result = await searchAsync('ou=People,dc=test,dc=com', opts);
        console.log("search completed");
        result.on('searchEntry', (entry) => {
            users.push(entry.object);
        });
        console.log("array built");
        result.on('error', (err) => {
            console.error(err);
            console.log("error after array");
            return res.status(500).send(err);
        });
        console.log("sending it all out");
        console.log("users", users);
        res.on('end', (result) => {
            console.log(`Found ${users.length} users`);
            console.log(users);
            return res.json(users);
        });
    }
    catch (err) {
        console.error(err);
        console.log("We hit an error");
        return res.status(500).send(err);
    }
};
exports.getAllLdapUsers = getAllLdapUsers;
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
    res.status(http_status_codes_1.StatusCodes.OK).json({ user });
};
exports.getOneUser = getOneUser;
