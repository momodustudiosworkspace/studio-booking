import { Router } from "express";
import { getUser } from "../../controllers/user/user.controllers";
import authMiddleWare from "../../middlewares/auth.middleware";



const router = Router()



// Get user ptofile 
router.get("/",authMiddleWare, getUser)

export default router