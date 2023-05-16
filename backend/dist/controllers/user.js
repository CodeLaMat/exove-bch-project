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
exports.showCurrentUser = exports.logout = exports.getOneUser = exports.getAllLdapUsers = exports.getAllUsers = exports.ldapLogin = exports.login = exports.updateManager = void 0;
const user_1 = __importDefault(require("../models/user"));
const errors_1 = require("../errors");
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import bcrypt from "bcryptjs";
const util_1 = require("../util");
const ldap = __importStar(require("ldapjs"));
const createNewClient = () => {
    const client = ldap.createClient({
        url: "ldap://localhost:389",
    });
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
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        user: tokenUser,
    });
};
exports.login = login;
const logout = async (req, res, next) => {
    res.cookie("token", "logout", {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
    });
    return res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "user logout" });
};
exports.logout = logout;
const getAllUsers = async (req, res, next) => {
    const users = await user_1.default.find({}).sort("role");
    if (!users) {
        throw new errors_1.NotFoundError("User List not available");
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json({ users, count: users.length });
};
exports.getAllUsers = getAllUsers;
// interface QueryParams {
//   search?: string;
//   role?: UserRoles;
//   sort?: "asc" | "desc";
// }
// const getAllUsers = async (req: Request, res: Response) => {
//   const queryParams: QueryParams = req.query;
//   const search = queryParams.search || "";
//   const query = {
//     $or: [
//       { firstName: new RegExp(search, "i") },
//       { surname: new RegExp(search, "i") },
//     ],
//   };
//   let result = User.find(query);
//   const page = Number(req.query.page) || 1;
//   const limit = Number(req.query.limit) || 10;
//   const skip = (page - 1) * limit;
//   result = result.skip(skip).limit(limit);
//   const users = await result;
//   const totalUsers = await User.countDocuments(query);
//   const numOfPages = Math.ceil(totalUsers / limit);
//   res.status(StatusCodes.OK).json({ users, totalUsers, numOfPages });
// };
const ldapLogin = async (req, res) => {
    const { username, password } = req.body;
    console.log(`${username} is trying to login with ${password} as a pwd`);
    const client = createNewClient();
    const bindDN = `uid=${username},ou=People,dc=test,dc=com`;
    client.bind(bindDN, password, (err) => {
        if (err) {
            console.error(err);
            res.status(401).send("Authentication failed");
            return;
        }
    });
    const searchOptions = {
        scope: "sub",
        filter: `(&(uid=${username})(objectClass=posixAccount))`,
        attributes: [
            "cn",
            "memberOf",
            "gidNumber",
            "description",
            "mail",
            "jpegPhoto",
            "telephoneNumber",
        ],
    };
    client.search(`uid=${username},ou=People,dc=test,dc=com`, searchOptions, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error retrieving user info");
            return;
        }
        const userAttributes = [];
        result.on("searchEntry", (entry) => {
            const user = {};
            entry.attributes.forEach((attribute) => {
                const key = attribute.type;
                const value = attribute.vals;
                user[key] = value;
            });
            userAttributes.push(user);
        });
        result.on("end", () => {
            console.log("authentication successfull");
            const userData = userAttributes[0];
            const payload = {
                user: {
                    userId: userData.userid,
                    role: userData.description,
                    name: userData.cn,
                    email: userData.mail,
                    phoneNumber: userData.telephoneNumber,
                    groupId: userData.gidNumber,
                    imagePath: userData.jpegPhoto,
                },
            };
            req.user = payload.user;
            console.log("payload", payload);
            const token = jsonwebtoken_1.default.sign(payload, `${process.env.JWT_SECRET}`, {
                expiresIn: "2d",
            });
            console.log("Token: ", token);
            console.log("req.user", req.user);
            // res.cookie("token", token, {
            //   httpOnly: true,
            //   secure: true,
            //   sameSite: "strict",
            //   expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // set expiration date to 2 days
            // });
            // res.setHeader('Set-Cookie', `jwtToken=${token}; HttpOnly; SameSite=None; Secure`);
            res.status(200).send({
                message: "Authentication successful",
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
    const client = createNewClient();
    const bindDN = `cn=admin,dc=test,dc=com`;
    client.bind(bindDN, "myadminpassword", (err) => {
        if (err) {
            console.error(err);
            res.status(401).send("Authentication failed");
            return;
        }
    });
    const opts = {
        filter: "(objectClass=inetOrgPerson)",
        scope: "sub",
        attributes: ["*"],
    };
    const users = [];
    client.search(`ou=People,dc=test,dc=com`, opts, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error retrieving user info");
            return;
        }
        const userAttributes = [];
        result.on("searchEntry", (entry) => {
            const user = {};
            entry.attributes.forEach((attribute) => {
                const key = attribute.type;
                const value = attribute.vals;
                user[key] = value;
            });
            userAttributes.push(user);
        });
        result.on("end", () => {
            console.log("authentication successfull");
            const userData = users[0];
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
            console.log("payload", payload);
        });
    });
    await client.unbind();
    console.log("client unbound");
};
exports.getAllLdapUsers = getAllLdapUsers;
const getOneUser = async (req, res, next) => {
    const { params: { id: userId }, } = req;
    const user = await user_1.default.findOne({ _id: userId });
    if (!user) {
        throw new errors_1.NotFoundError(`No user with id ${userId}`);
    }
    (0, util_1.checkPermissions)(req.user, userId);
    res.status(http_status_codes_1.StatusCodes.OK).json({ user });
};
exports.getOneUser = getOneUser;
const showCurrentUser = async (req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).json({ user: req.user });
};
exports.showCurrentUser = showCurrentUser;
// const register = async (req: Request, res: Response) => {
//   res.send("user register");
// };
// const updateUser = async (req: Request, res: Response) => {
//   res.send("show stats");
// };
// const deleteUser = async (req: Request, res: Response) => {
//   res.send("show stats");
// };
const updateManager = async (req, res) => {
    const { id: employeeId } = req.params;
    const { managerId } = req.body;
    const employee = await user_1.default.findOne({ _id: employeeId });
    if (!employee) {
        throw new errors_1.NotFoundError(`Employee with ID ${employeeId} not found`);
    }
    const manager = await user_1.default.findOne({ _id: managerId });
    if (!manager) {
        throw new errors_1.NotFoundError(`Manager with ID ${managerId} not found`);
    }
    if (employee.work) {
        employee.work.reportsTo = managerId;
    }
    else {
        employee.work = {
            reportsTo: managerId,
        };
    }
    await employee.save();
    res.status(http_status_codes_1.StatusCodes.OK).json({
        message: "Manager updated successfully",
        employee: employee,
    });
};
exports.updateManager = updateManager;
