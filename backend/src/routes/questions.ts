import { Router } from "express";
const router = Router();

import {
  addQuestion,
  deleteQuestion,
  getAllQuestions,
  getOneQuestion,
  updateQuestion,
} from "../controllers/questions";

router.route("/").get(getAllQuestions).post(addQuestion);
router
  .route("/:id")
  .get(getOneQuestion)
  .delete(deleteQuestion)
  .patch(updateQuestion);

export default router;
