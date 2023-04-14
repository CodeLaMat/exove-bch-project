"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
var surveys_1 = require("../controllers/surveys");
router.route("/").get(surveys_1.getAllSurveys).post(surveys_1.addSurvey);
router.route("/:id").get(surveys_1.getOneSurvey).delete(surveys_1.deleteSurvey).patch(surveys_1.updateSurvey);
exports.default = router;
