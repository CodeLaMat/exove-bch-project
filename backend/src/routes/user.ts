import { Router } from "express";
const router = Router();
import {
  login,
  ldapLogin,
  getAllUsers,
  getAllLdapUsers,
  getOneUser,
  logout,
  showCurrentUser,
} from "../controllers/user";
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authentication";
router.route("/auth/login").post(login);
router.route("/auth/ldaplogin").post(ldapLogin);
router
  .route("/user")
  .get(authenticateUser, authorizePermissions("hr"), getAllUsers);
router.route("/ldapusers").get(getAllLdapUsers);
router.route("/user/:id").get(authenticateUser, getOneUser);
router.route("/showMe").get(authenticateUser, showCurrentUser);
router.route("/auth/logout").get(logout);

export default router;
