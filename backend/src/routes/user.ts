import { Router } from "express";
const router = Router();
import {
  login,
  register,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
} from "../controllers/user";

router.route("/auth/login").post(login);
router.route("/auth/register").post(register);
router.route("/").get(getAllUsers);
router.route("/:id").get(getOneUser).delete(deleteUser).patch(updateUser);

export default router;
