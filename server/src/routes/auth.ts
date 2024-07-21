import express from "express";
import { validateReqBody } from "../middleware/validator";
import { LoginSchema, SignupSchema } from "../schema/user";
import { login, signup, refresh } from "../controller/auth";
import { RefreshSchema } from "../schema/user";

const router = express();

router.post("/signup", validateReqBody(SignupSchema), signup);
router.post("/login", validateReqBody(LoginSchema), login);
router.post("/refresh", validateReqBody(RefreshSchema), refresh);

export default router;
