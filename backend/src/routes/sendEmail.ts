import { Router } from "express";
const router = Router();
import sendEmailEthereal from "../controllers/sendEmail";

router.route("/").get(sendEmailEthereal);

export default router;
