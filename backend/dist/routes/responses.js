"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const responses_1 = require("../controllers/responses");
router
    .route("/user:id")
    .post(responses_1.addResponse)
    .get(responses_1.getAllResponses)
    .patch(responses_1.updateResponses);
router.route("/").get(responses_1.showStats);
exports.default = router;
