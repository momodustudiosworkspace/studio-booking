import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string;
}

export function authMiddleWare(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  try {
    const header = req.headers["authorization"];
    if (!header || !header.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Extract token safely
    const token = header.substring("Bearer ".length).trim();

    const secret = process.env["JWT_SECRET"];
    if (!secret) {
      res.status(500).json({ message: "JWT is missing" });
      return;
    }

    const payload = jwt.verify(token, secret) as { userId: string };
    req.userId = payload.userId;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}

export default authMiddleWare;
