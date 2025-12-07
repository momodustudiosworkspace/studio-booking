import express from "express";
import { createOrUpdatePackage, deletePackage, getAllPackages, getPackage, updatePackage } from "../../controllers/admin/package.controller";

const router = express.Router();

router.post("/", createOrUpdatePackage);
router.get("/", getAllPackages);
router.get("/:id", getPackage);
router.put("/:id", updatePackage);
router.delete("/:id", deletePackage);

export default router;
