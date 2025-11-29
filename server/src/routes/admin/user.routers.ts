
import express from "express"
import { getUsersWithBookingCount } from "../../controllers/admin/users.controllers"
const router = express()


router.get("/all", getUsersWithBookingCount)

export default router