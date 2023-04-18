"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const user_1 = require("../controllers/user");
const authentication_1 = __importDefault(require("../middleware/authentication"));
router.route("/auth/login").post(user_1.login);
router.route("/auth/ldadlogin").post(user_1.ldapLogin);
router.route("/user").get(authentication_1.default, user_1.getAllUsers);
router.route("/ldapusers").get(user_1.getAllLdapUsers);
router.route("/user/:id").get(authentication_1.default, user_1.getOneUser);
exports.default = router;
