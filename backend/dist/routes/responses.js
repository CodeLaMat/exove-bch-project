"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const responses_1 = require("../controllers/responses");
const authentication_1 = require("../middleware/authentication");
router.route("/").get(authentication_1.authenticateUser, responses_1.getAllResponses);
router.route("/stats").get(responses_1.showStats);
const authentication_1 = require("../middleware/authentication");
router
    .route("/")
    .post(authentication_1.authenticateUser, responses_1.addResponse)
    .get(authentication_1.authenticateUser, responses_1.getAllResponses);
router.route("/stats").get(responses_1.showStats);
router
    .route("/:id")
    .get(authentication_1.authenticateUser, responses_1.getSingleResponse)
    .patch(authentication_1.authenticateUser, responses_1.addResponse)
    .patch(authentication_1.authenticateUser, responses_1.updateResponse);
    .route("/:id")
    .get(authentication_1.authenticateUser, responses_1.getSingleResponse)
    .patch(authentication_1.authenticateUser, responses_1.updateResponse);
exports.default = router;
