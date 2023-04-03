import { Router } from "express";
const router = Router();

import {
    addSurvey,
    deleteSurvey,
    getAllSurveys,
    getOneSurvey,
    updateSurvey,
} from "../controllers/surveys";

router.route("/").get(getAllSurveys).post(addSurvey);
router
  .route("/:id")
  .get(getOneSurvey)
  .delete(deleteSurvey)
  .patch(updateSurvey);

export default router;