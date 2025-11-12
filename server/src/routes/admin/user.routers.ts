
import express from "express"
import { getAllUsers } from "../../controllers/admin/users.controllers"
const router = express()


router.get("/all", getAllUsers)

export default router