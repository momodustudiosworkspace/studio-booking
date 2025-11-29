import { Router } from "express";
import { getUser, sendUserSubscriptionEmail } from "../../controllers/user/user.controllers";
import authMiddleWare from "../../middlewares/auth.middleware";



const router = Router()



// Get user ptofile 
router.get("/", authMiddleWare, getUser)

// Send newsletter email to user
router.post("/send/newsletter", sendUserSubscriptionEmail)

export default router