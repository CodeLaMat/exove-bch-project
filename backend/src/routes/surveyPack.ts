import { Router } from "express";
const router = Router();

import {
  createSurveyPack,
  getSurveyPack,
  updateSurveyPack,
  deleteSurveyPack,
  getSurveyors,
  updateSurveyors,
  deleteSurveyors,
} from "../controllers/surveyPack";

router.route("/").post(createSurveyPack);
router
  .route("/:id")
  .get(getSurveyPack)
  .patch(updateSurveyPack)
  .delete(deleteSurveyPack);
router
  .route("/surveyors/:id")
  .get(getSurveyors)
  .patch(updateSurveyors)
  .delete(deleteSurveyors);

export default router;
