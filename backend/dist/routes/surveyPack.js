"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const surveyPack_1 = require("../controllers/surveyPack");
const authentication_1 = require("../middleware/authentication");
router
    .route("/")
    .get(authentication_1.authenticateUser, (0, authentication_1.authorizePermissions)("hr", "user"), surveyPack_1.getAllSurveyPacks)
    .post(authentication_1.authenticateUser, (0, authentication_1.authorizePermissions)("hr"), surveyPack_1.createSurveyPack);
router
    .route("/:id")
    .get(authentication_1.authenticateUser, (0, authentication_1.authorizePermissions)("hr"), surveyPack_1.getSurveyPack)
    .patch(authentication_1.authenticateUser, (0, authentication_1.authorizePermissions)("hr", "user", "manager"), surveyPack_1.updateSurveyPack)
    .delete(authentication_1.authenticateUser, (0, authentication_1.authorizePermissions)("hr"), surveyPack_1.deleteSurveyPack);
router
    .route("/surveyors/:id")
    .get(authentication_1.authenticateUser, surveyPack_1.getSurveyors)
    .patch(authentication_1.authenticateUser, surveyPack_1.updateSurveyors);
router
    .route("/manager/:id")
    .get(authentication_1.authenticateUser, (0, authentication_1.authorizePermissions)("hr", "manager"), surveyPack_1.getManagerApproval)
    .patch(authentication_1.authenticateUser, (0, authentication_1.authorizePermissions)("hr", "manager"), surveyPack_1.updateManagerApproval);
router
    .route("/manager-update/:id")
    .patch(authentication_1.authenticateUser, (0, authentication_1.authorizePermissions)("user"), surveyPack_1.updateManager);
router
    .route("/send-reminder/:id")
    .patch(authentication_1.authenticateUser, (0, authentication_1.authorizePermissions)("hr"), surveyPack_1.sendReminderEmail);
exports.default = router;
