import express from "express";
import { verifyUser } from "./controllers/verifyUser.js";
import { loginUser } from "./controllers/loginUser.js";
import { createUser } from "./controllers/createUser.js";
import { logoutUser } from "./controllers/logoutUser.js";
import { refreshToken } from "./controllers/refreshToken.js";
import { generateOtp } from "./controllers/generateOtp.js";
import { verifyOtp } from "./controllers/verifyOtp.js";
import { resetPassword } from "./controllers/resetPassword.js";
import { resentOtp } from "./controllers/resentOtp.js";
import passport from "./config/passport.js";
import { googleAuthentication } from "./controllers/googleAuthentication.js";

const router = new express.Router();

router.get("/verify/:id", verifyUser);
router.get("/refresh/:id", refreshToken);
router.get("/logout/:id", logoutUser);
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }))
router.get("/google/callback", passport.authenticate("google", { session: false }), googleAuthentication)
router.post("/login", loginUser);
router.post("/register", createUser);
router.post("/forgot-password", generateOtp);
router.post("/otp", verifyOtp);
router.post("/resend-otp", resentOtp);
router.post("/reset-password", resetPassword);

export default router;
