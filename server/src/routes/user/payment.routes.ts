import express from "express";

// import { initPayment, verifyPayment } from "../controllers/payment.controller";
import authMiddleWare from "../../middlewares/auth.middleware";
import { createPayment } from "../../controllers/user/payment.controller";

const router = express.Router();


// router.post("/init", authMiddleWare, initPayment)
// router.post("/verify", authMiddleWare, verifyPayment)
router.post("/create", authMiddleWare, createPayment)

export default router