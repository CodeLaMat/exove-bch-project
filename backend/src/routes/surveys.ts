import { Router } from "express";
const router = Router();

import {
  addSurvey,
  deleteSurvey,
  getAllSurveys,
  getOneSurvey,
  updateSurvey,
} from "../controllers/surveys";
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authentication";

router
  .route("/")
  .get(
    authenticateUser,
    authorizePermissions("hr", "user", "manager"),
    getAllSurveys
  )
  .post(authenticateUser, authorizePermissions("hr"), addSurvey);
router
  .route("/:id")
  .get(authenticateUser, getOneSurvey)
  .delete(authenticateUser, deleteSurvey)
  .patch(authenticateUser, updateSurvey);
("");
export default router;
