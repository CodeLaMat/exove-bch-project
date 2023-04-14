"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
var responses_1 = require("../controllers/responses");
router
    .route("/response/user:id")
    .post(responses_1.addResponse)
    .get(responses_1.getAllResponses)
    .patch(responses_1.updateResponses);
router.route("/response").get(responses_1.showStats);
exports.default = router;
