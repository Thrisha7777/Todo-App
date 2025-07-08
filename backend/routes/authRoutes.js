import express from "express";
import { loginUser } from "../controllers/authController.js";

const router = express.Router();

// Route for social login or normal login
router.post("/login", loginUser);

export default router;
