"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const surveys_1 = require("../controllers/surveys");
const authentication_1 = require("../middleware/authentication");
router
    .route("/")
    .get(authentication_1.authenticateUser, (0, authentication_1.authorizePermissions)("hr"), surveys_1.getAllSurveys)
    .post(authentication_1.authenticateUser, (0, authentication_1.authorizePermissions)("hr"), surveys_1.addSurvey);
router
    .route("/:id")
    .get(authentication_1.authenticateUser, surveys_1.getOneSurvey)
    .delete(authentication_1.authenticateUser, surveys_1.deleteSurvey)
    .patch(authentication_1.authenticateUser, surveys_1.updateSurvey);
("");
exports.default = router;
