"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const surveys_1 = require("../controllers/surveys");
router.route("/").get(surveys_1.getAllSurveys).post(surveys_1.addSurvey);
router
    .route("/:id")
    .get(surveys_1.getOneSurvey)
    .delete(surveys_1.deleteSurvey)
    .patch(surveys_1.updateSurvey);
exports.default = router;
