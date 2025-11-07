import express from "express";

import { verifyPayment } from "../controllers/payment.controller";
import authMiddleWare from "../middlewares/auth.middleware";

const router = express.Router();


router.post("/verify-payment", authMiddleWare, verifyPayment)

export default router