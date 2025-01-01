import express from 'express';
import { checkAuth, forgotPassword, login, logout, resetPassword, signup, verifyEmail }  from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);
router.get("/update-profile", verifyToken, checkAuth);

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-email", verifyEmail)
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);


router.post("/logout", logout);

export default router; // Export the router