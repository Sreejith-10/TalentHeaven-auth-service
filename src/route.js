import express from "express";
import {verifyUser} from "./controllers/verifyUser.js";
import {loginUser} from "./controllers/loginUser.js";
import {createUser} from "./controllers/createUser.js";
import {logoutUser} from "./controllers/logoutUser.js";
import {refreshToken} from "./controllers/refreshToken.js";
import {generateOtp} from "./controllers/generateOtp.js";
import {verifyOtp} from "./controllers/verifyOtp.js";
import {resetPassword} from "./controllers/resetPassword.js";

const router = new express.Router();

router.get("/verify/:id", verifyUser);
router.get("/refresh/:id", refreshToken);
router.post("/register", createUser);
router.get("/logout/:id", logoutUser);
router.post("/login", loginUser);
router.post("/forgot-password", generateOtp);
router.post("/otp", verifyOtp);
router.post("/reset-password", resetPassword);

export default router;
