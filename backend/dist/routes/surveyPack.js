"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const surveyPack_1 = require("../controllers/surveyPack");
router.route("/").post(surveyPack_1.createSurveyPack);
router
    .route("/:id")
    .get(surveyPack_1.getSurveyPack)
    .patch(surveyPack_1.updateSurveyPack)
    .delete(surveyPack_1.deleteSurveyPack);
//router.route("/employee/:id").patch(updateSurveyPack);
//router.route("/manager/:id").patch(updateSurveyPack);
router.route("/surveyors/:id").get(surveyPack_1.getSurveyors).patch(surveyPack_1.updateSurveyors);
exports.default = router;
