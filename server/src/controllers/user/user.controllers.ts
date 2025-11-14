import { Request, Response } from "express";
import mongoose from "mongoose";
import Booking from "../../models/booking.models";
import User from "../../models/user.models";

export const getUser = async (req: Request, res: Response) => {
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
