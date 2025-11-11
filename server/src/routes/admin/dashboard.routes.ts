import { Router } from "express";
import { getAdminDashboardStats } from "../../controllers/admin/dashboard.controllers";
import authMiddleWare from "../../middlewares/auth.middleware";

const router = Router();


router.get('/stats',authMiddleWare, getAdminDashboardStats)

export default router