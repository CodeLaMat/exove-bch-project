import { Router } from "express";
const router = Router();
import {
  login,
  ldapLogin,
  getAllUsers,
  getOneUser,
  logout,
  showCurrentUser,
  updateManager, // Import the updateManager controller function
} from "../controllers/user";
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authentication";

router.route("/auth/login").post(login);
router.route("/auth/ldaplogin").post(ldapLogin);
router
  .route("/user")
  .get(
    authenticateUser,
    authorizePermissions("hr", "user", "manager"),
    getAllUsers
  );
router.route("/user/:id").get(authenticateUser, getOneUser);
router
  .route("/user/:id/manager")
  .put(authenticateUser, authorizePermissions("hr"), updateManager); // Add the updateManager route

router.route("/showMe").get(authenticateUser, showCurrentUser);
router.route("/auth/logout").get(logout);

export default router;
