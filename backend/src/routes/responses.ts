import { Router } from "express";
const router = Router();
import {
  addResponse,
  getAllResponses,
  updateResponses,
  showStats,
} from "../controllers/responses";

router
  .route("/user:id")
  .post(addResponse)
  .get(getAllResponses)
  .patch(updateResponses);
router.route("/").get(showStats);
export default router;
