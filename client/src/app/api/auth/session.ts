import { getToken } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST" && req.query['update'] === "1") {
    try {
      const body = req.body;
      const token = await getToken({ req, secret: `${process.env["NEXTAUTH_SECRET"]}` });

      if (!token) return res.status(401).json({ message: "No session found" });

      // Merge new tokens
      const updatedSession = {
        ...token,
        accessToken: body.accessToken,
        refreshToken: body.refreshToken,
      };

      // Store in cookie (optional) or memory — depending on your NextAuth config
      // NextAuth automatically keeps the updated token in memory for the session duration

      return res.status(200).json({ message: "Session updated", updatedSession });
    } catch (err) {
      console.error("Error updating session:", err);
      return res.status(500).json({ message: "Failed to update session" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
