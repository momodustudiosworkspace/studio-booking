import { Request, Response } from "express";
import mongoose from "mongoose";
import Booking from "../../models/booking.models";
import User from "../../models/user.models";
import { sendNewsletterEmail } from "../../utils/sendEmail";

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        console.log("User ID:", userId);

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid or missing user ID" });
        }

        const user = await User.findById(userId)

        // Aggregation pipeline to compute stats for this user
        const [stats] = await Booking.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(userId) } },
            {
                $group: {
                    _id: null,
                    totalBookings: { $sum: 1 },
                    totalCompleted: {
                        $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
                    },
                    totalPending: {
                        $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
                    },
                    totalCancelled: {
                        $sum: { $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0] },
                    },
                },
            },
        ]);

        console.log("Stats: ", stats);


        // Respond with default values if no stats exist
        return res.status(200).json({
        
                user: user,
                stats: stats || {
                    totalBookings: 0,
                    totalCompleted: 0,
                    totalPending: 0,
                    totalCancelled: 0,
                }
            
        }

        );
    } catch (error) {
        console.error("Error fetching user stats:", error);
        return res.status(500).json({ message: "Error occurred" });
    }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid or missing user ID" });
    }

    // Whitelist allowed fields
    const allowedUpdates = [
      "first_name",
      "last_name",
      "image",
      "phoneNumber",
      "address",
    ];

    const updates: Record<string, any> = {};

    for (const key of allowedUpdates) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "No valid fields provided for update",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-passwordHash");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return res.status(500).json({ message: "Error occurred" });
  }
};

export const sendUserSubscriptionEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        console.log("email received: ", email);
        
        
        // Send newletter email to user (email/SMS)
        await sendNewsletterEmail(email);
        return res.status(200).json({
            status: "success",
            message: "You have successfully subscribed to our newsletter!"
        }

        );
    } catch (error) {
        console.error("Error sending mails:", error);
        return res.status(500).json({ message: "Error occurred" });
    }
};
