import express from "express";
import { registerUser,loginUser, getUser } from "../controllers/authController.js";
import { protect } from "../middleware/protect.js";
import { isAdmin } from "../middleware/adminCheck.js";

const router= express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/users',protect,isAdmin,getUser);

export default router;