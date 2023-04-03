import { Router } from "express";
const router = Router();
import {
  addResponse,
  getAllResponses,
  updateResponses,
  showStats,
} from "../controllers/responses";

router
  .route("/response/user:id")
  .post(addResponse)
  .get(getAllResponses)
  .patch(updateResponses);
router.route("/response").get(showStats);
export default router;
