"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
var questions_1 = require("../controllers/questions");
router.route("/").get(questions_1.getAllQuestions).post(questions_1.addQuestion);
router
    .route("/:id")
    .get(questions_1.getOneQuestion)
    .delete(questions_1.deleteQuestion)
    .patch(questions_1.updateQuestion);
exports.default = router;
