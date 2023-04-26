import { Router } from "express";
const router = Router();

import {
  createSurveyPack,
  getSurveyPack,
  updateSurveyPack,
  deleteSurveyPack,
  getSurveyors,
  updateSurveyors,
} from "../controllers/surveyPack";
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authentication";

router.route("/").post(createSurveyPack);
router
  .route("/:id")
  .get(getSurveyPack)
  .patch(updateSurveyPack)
  .delete(deleteSurveyPack);
//router.route("/employee/:id").patch(updateSurveyPack);
//router.route("/manager/:id").patch(updateSurveyPack);

router.route("/surveyors/:id").get(getSurveyors).patch(updateSurveyors);

export default router;
