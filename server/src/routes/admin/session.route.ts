import { Router } from "express";
import { createSession, deleteSession, getAllSessions, getSingleSession, updateSession } from "../../controllers/admin/session.controllers";

const router = Router();

// CREATE
router.post("/", createSession);

// READ
router.get("/", getAllSessions);
router.get("/:id", getSingleSession);

// UPDATE
router.put("/:id", updateSession);

// DELETE
router.delete("/:id", deleteSession);

export default router;
