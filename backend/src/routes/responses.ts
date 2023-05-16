import { Router } from "express";
const router = Router();
import {
  addResponse,
  getAllResponses,
  showStats,
  getSingleResponse,
  updateResponse,
} from "../controllers/responses";
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authentication";

router.route("/").get(authenticateUser, getAllResponses);
router.route("/stats").get(showStats);
router
  .route("/:id")
  .get(authenticateUser, getSingleResponse)
  .patch(authenticateUser, addResponse)
  .patch(authenticateUser, updateResponse);
export default router;
