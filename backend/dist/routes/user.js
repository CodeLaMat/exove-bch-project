"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const user_1 = require("../controllers/user");
const authentication_1 = require("../middleware/authentication");
router.route("/auth/login").post(user_1.login);
router.route("/auth/ldaplogin").post(user_1.ldapLogin);
router
    .route("/user")
    .get(authentication_1.authenticateUser, (0, authentication_1.authorizePermissions)("hr"), user_1.getAllUsers);
router.route("/ldapusers").get(user_1.getAllLdapUsers);
router.route("/user/:id").get(authentication_1.authenticateUser, user_1.getOneUser);
router.route("/showMe").get(authentication_1.authenticateUser, user_1.showCurrentUser);
router.route("/auth/logout").get(user_1.logout);
exports.default = router;
