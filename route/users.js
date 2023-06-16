import express from "express"
const router = express.Router();

import { getLoginRegisterForm, verifyemail, registerUser, login, getForgotPassword, forgotpasswordmail, message, getresetPassword, reseting, logout } from "../controllers/user.js";


router.route("/login").get(getLoginRegisterForm);

router.route("/forgotPass").get(getForgotPassword);
router.route("/reset-password/:token").get(getresetPassword);

router.route("/reset-password/:token").post(reseting);

router.route("/message").get(message);
//router.route("/forgotPass").get(forgotpasswordmail);
router.route("/forgotPass").post(forgotpasswordmail);
router.route("/verify-email").get(verifyemail);
router.route("/registerUser").post(registerUser);
router.route("/login").post(login);
router.route("/logout").get(logout);

export default router