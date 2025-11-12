import express from "express"
import { getAllPayment, getPaymentbyId } from "../../controllers/admin/payment.controllers"
const router = express()


router.get("/all", getAllPayment)
router.get("/:id", getPaymentbyId)


export default router