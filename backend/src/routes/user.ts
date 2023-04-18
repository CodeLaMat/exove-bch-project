import { Router } from "express";
const router = Router();
import { login, ldapLogin, getAllUsers, getAllLdapUsers, getOneUser } from "../controllers/user";
import authenticateUser from "../middleware/authentication";
router.route("/auth/login").post(login);
router.route("/auth/ldadlogin").post(ldapLogin);
router.route("/user").get(authenticateUser, getAllUsers);
router.route("/ldapusers").get(getAllLdapUsers);
router.route("/user/:id").get(authenticateUser, getOneUser);

export default router;