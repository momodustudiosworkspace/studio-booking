import { Router } from "express";
import { getUserProfile, sendUserSubscriptionEmail, updateUserProfile } from "../../controllers/user/user.controllers";
import authMiddleWare from "../../middlewares/auth.middleware";



const router = Router()



// Get user ptofile 
router.get("/", authMiddleWare, getUserProfile)

router.put("/", authMiddleWare, updateUserProfile)

// Send newsletter email to user
router.post("/send/newsletter", sendUserSubscriptionEmail)

export default router