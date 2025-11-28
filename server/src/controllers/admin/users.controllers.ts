import { Request, Response } from "express";
import User from "../../models/user.models";



// Get all bookings 
export const getAllUsers = async (req: Request, res: Response)=> {
  try {
    const page = parseInt(req.query['page'] as string)|| 1;
    const limit =  parseInt(req.query['limit'] as string) || 10;
    const skip = (page - 1) * limit;

    // Fetch bookings with pagination
    const [users, total] = await Promise.all([
      User.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments(),
    ]);

    return res.status(200).json({
      data: users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("❌ Error fetching paginated bookings:", error);
   return  res.status(500).json({ message: "Failed to fetch bookings" });
  }
}

export const getUsersWithBookingCount = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query['page'] as string)|| 1;
    const limit =  parseInt(req.query['limit'] as string) || 10;
    const skip = (page - 1) * limit;

    // Count total number of users (for pagination)
    const totalUsers = await User.countDocuments();

    // Paginated + Aggregated data
    const users = await User.aggregate([
      { $sort: { createdAt: -1 } },  // sort before pagination for consistency
      { $skip: skip },
      { $limit: limit },

      // Lookup bookings for each user
      {
        $lookup: {
          from: "bookings",
          localField: "_id",
          foreignField: "user",
          as: "bookings"
        }
      },

      // Add booking count
      {
        $addFields: {
          totalBookings: { $size: "$bookings" }
        }
      },

      // Remove raw bookings + sensitive fields
      {
        $project: {
          passwordHash: 0,
          bookings: 0
        }
      }
    ]);

    return res.status(200).json({
      data: users,
      pagination: {
        total: totalUsers,
        page,
        limit,
        totalPages: Math.ceil(totalUsers / limit),
      },
    });

  } catch (error) {
    console.error("Error fetching paginated users with booking count:", error);
    return res.status(500).json({ message: "Failed to fetch users" });
  }
};