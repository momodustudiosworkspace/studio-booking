import { Request, Response } from "express";
import Session from "../../models/session.models";
import Package from "../../models/package.models";

// ✅ Create a new session
export async function createSession(req: Request, res: Response) {
  try {
    const { session_title, image_url, description } = req.body;

    console.log(session_title);
    

    // Validate required field
    if (!session_title || session_title.trim() === "") {
      return res.status(400).json({ message: "Session title is required" });
    }

    // Optional: If only admins can create sessions and req.user exists
    // if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    // Check if a session with this title already exists
    const existing = await Session.findOne({ title: session_title });
    if (existing) {
      return res.status(409).json({ message: "Session title already exists" });
    }

    // Create session
    const session = await Session.create({
      title: session_title,
      imageUrl: image_url,
      description:description
    });

    return res.status(200).json({
      status: 200,
      message: "Session created successfully",
      session,
    });
  } catch (error: any) {
    console.log("Error creating session:", error);

    // Mongoose duplicate key
    if (error.code === 11000) {
      return res.status(409).json({
        status: 409,
        message: "Duplicate session title",
      });
    }

    return res.status(500).json({
      status: 500,
      message: "Failed to create session",
      error: error.message,
    });
  }
}

// ✅ Update session
export async function updateSession(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Session title is required" });
    }

    // Check if session exists
    const session = await Session.findById(id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Check duplicate title except for itself
    const existing = await Session.findOne({ title, _id: { $ne: id } });
    if (existing) {
      return res.status(409).json({ message: "Another session already uses this title" });
    }

    // Update
    session.title = title;
    await session.save();

    return res.status(200).json({
      status: 200,
      message: "Session updated successfully",
      session,
    });

  } catch (error: any) {
    console.log("Update session error:", error);

    if (error.code === 11000) {
      return res.status(409).json({ message: "Duplicate session title" });
    }

    return res.status(500).json({
      status: 500,
      message: "Failed to update session",
      error: error.message,
    });
  }
}

// ✅ Delete a session
export async function deleteSession(req: Request, res: Response) {
  try {
    const { id } = req.params;

    // Check if session exists
    const session = await Session.findById(id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    await session.deleteOne();

    return res.status(200).json({
      status: 200,
      message: "Session deleted successfully",
    });

  } catch (error: any) {
    console.log("Delete session error:", error);

    return res.status(500).json({
      status: 500,
      message: "Failed to delete session",
      error: error.message,
    });
  }
}

export async function getAllSessions(_req: Request, res: Response) {
  try {
    const sessions = await Session.aggregate([
      { $sort: { title: 1 } },

      {
        $lookup: {
          from: "packages",
          localField: "_id",
          foreignField: "session",
          as: "packages",
        },
      },

      {
        $project: {
          title: 1,
          imageUrl: 1,
          description: 1,
          createdAt: 1,
          packages: {
            title: 1,
            // price: 1,
            // discount: 1,
            // services: 1,
          },
        },
      },
    ]);

    return res.status(200).json({
      status: 200,
      message: "Sessions fetched successfully",
      data: sessions,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: "Failed to fetch sessions",
      error: error.message,
    });
  }
}


export async function getSingleSession(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const session = await Session.findById(id);

    if (!session) {
      return res.status(404).json({
        status: 404,
        message: "Session not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Session fetched successfully",
      data: session,
    });

  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: "Failed to fetch session",
      error: error.message,
    });
  }
}

export async function getSessionCount(_req: Request, res: Response) {
  try {
    const totalSessions = await Session.countDocuments();
    const totalPackages = await Package.countDocuments();

    return res.status(200).json({
      status: 200,
      message: "Session count fetched successfully",
      data: { totalSessions, totalPackages },
    });

  }
  catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: "Failed to fetch session count",
      error: error.message,
    });
  }
}