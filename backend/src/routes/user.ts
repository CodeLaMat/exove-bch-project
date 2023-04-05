import { Router } from "express";
const router = Router();
import { login, getAllUsers, getOneUser } from "../controllers/user";
import authenticateUser from "../middleware/authentication";
router.route("/auth/login").post(login);
router.route("/user").get(authenticateUser, getAllUsers);
router.route("/user/:id").get(authenticateUser, getOneUser);

export default router;
