import { Request, Response } from "express";
import Staff from "../../models/staff.models";
// import { sendEmail } from "../../config/sendGrid.config";
// import crypto from "crypto";
import jwt from "jsonwebtoken";
import { sendStaffInivitationEmail } from "../../utils/sendEmail";
import { generateInvitationLink } from "../../utils/generateInvitationLink";



// ✅ Invite staff member (send invitation email)
export async function inviteStaff(req: Request, res: Response) {
  try {
    const { first_name, last_name, email, role } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !email || !role) {
      return res.status(400).json({ 
        message: "First name, last name, email, and role are required" 
      });
    }

    // Check if staff with this email already exists
    const existingStaff = await Staff.findOne({ email });
    if (existingStaff && existingStaff.status !== "inactive") {
      return res.status(409).json({ 
        message: "Staff member with this email already exists" 
      });
    }

    // Generate invitation token (expires in 7 days)
    const invitationLink = generateInvitationLink({ first_name, last_name, email, role }) 

     await Staff.create({
        first_name,
        last_name,
        email,
        // phoneNumber,
        role,
        // specialization: specialization || [],
        // bio: bio || "",
      });


    // Send invitation email
    await sendStaffInivitationEmail(email, first_name, invitationLink);

    return res.status(200).json({
      status: 200,
      message: "Invitation sent successfully",
      data: { email, first_name, last_name },
    });
  } catch (error: any) {
    console.log("Error inviting staff:", error);

    return res.status(500).json({
      status: 500,
      message: "Failed to send invitation",
      error: error.message,
    });
  }
}

// ✅ Accept invitation and create staff profile
export async function acceptInvitation(req: Request, res: Response) {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Invitation token is required" });
    }

    // Verify token
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env['JWT_SECRET']! || "secret_key");
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired invitation link" });
    }

    const { email} = decoded;

    // Validate required fields
    // if (!phoneNumber) {
    //   return res.status(400).json({ 
    //     message: "Phone number is required" 
    //   });
    // }

    // Check if staff already exists
    let staff = await Staff.findOne({ email });

    if (staff && staff.status !== "inactive") {
      return res.status(409).json({ message: "Staff profile already exists" });
    }

    if (staff) {
      staff.status = "active";
      staff.isInvitationAccepted = true
      await staff.save();
    }
    return res.status(200).json({
      status: 200,
      message: "Staff profile created successfully",
      staff,
    });
  } catch (error: any) {
    console.log("Error accepting invitation:", error);

    return res.status(500).json({
      status: 500,
      message: "Failed to create staff profile",
      error: error.message,
    });
  }
}

// ✅ Get all staff members
export async function getAllStaff(req: Request, res: Response) {
  try {
    const page = parseInt(req.query['page'] as string) || 1;
    const limit = parseInt(req.query['limit'] as string) || 10;
    const skip = (page - 1) * limit;
    const status = req.query['status'] as string;
    const role = req.query['role'] as string;

    // Build filter
    const filter: any = {};
    if (status) filter.status = status;
    if (role) filter.role = role;

    const [staff, total] = await Promise.all([
      Staff.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Staff.countDocuments(filter),
    ]);

    return res.status(200).json({
      status: 200,
      message: "Staff members fetched successfully",
      data: staff,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.log("Error fetching staff:", error);

    return res.status(500).json({
      status: 500,
      message: "Failed to fetch staff members",
      error: error.message,
    });
  }
}

// ✅ Get staff member by ID
export async function getStaffById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const staff = await Staff.findById(id);
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }

    return res.status(200).json({
      status: 200,
      message: "Staff member fetched successfully",
      staff,
    });
  } catch (error: any) {
    console.log("Error fetching staff by ID:", error);

    return res.status(500).json({
      status: 500,
      message: "Failed to fetch staff member",
      error: error.message,
    });
  }
}

// ✅ Update staff member
export async function updateStaff(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { first_name, last_name, phoneNumber, role, hourly_rate, specialization, bio, status, working_hours } = req.body;

    // Check if staff exists
    const staff = await Staff.findById(id);
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }

    // Update fields if provided
    if (first_name) staff.first_name = first_name;
    if (last_name) staff.last_name = last_name;
    if (phoneNumber) staff.phoneNumber = phoneNumber;
    if (role) staff.role = role;
    if (hourly_rate) staff.hourly_rate = hourly_rate;
    if (specialization) staff.specialization = specialization;
    if (bio) staff.bio = bio;
    if (status) staff.status = status;
    if (working_hours) staff.working_hours = working_hours;

    await staff.save();

    return res.status(200).json({
      status: 200,
      message: "Staff member updated successfully",
      staff,
    });
  } catch (error: any) {
    console.log("Error updating staff:", error);

    return res.status(500).json({
      status: 500,
      message: "Failed to update staff member",
      error: error.message,
    });
  }
}

// ✅ Update staff availability
export async function updateStaffAvailability(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { availability } = req.body;

    if (!availability) {
      return res.status(400).json({ message: "Availability data is required" });
    }

    const staff = await Staff.findById(id);
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }

    staff.availability = availability;
    await staff.save();

    return res.status(200).json({
      status: 200,
      message: "Staff availability updated successfully",
      staff,
    });
  } catch (error: any) {
    console.log("Error updating availability:", error);

    return res.status(500).json({
      status: 500,
      message: "Failed to update availability",
      error: error.message,
    });
  }
}

// ✅ Delete staff member (soft delete - set to inactive)
export async function deleteStaff(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const staff = await Staff.findById(id);
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }

    staff.status = "inactive";
    await staff.save();

    return res.status(200).json({
      status: 200,
      message: "Staff member deactivated successfully",
    });
  } catch (error: any) {
    console.log("Error deleting staff:", error);

    return res.status(500).json({
      status: 500,
      message: "Failed to delete staff member",
      error: error.message,
    });
  }
}

// ✅ Get staff statistics (for dashboard)
export async function getStaffStatistics(_req: Request, res: Response) {
  try {
    const [totalStaff, activeStaff, inactiveStaff, staffByRole] = await Promise.all([
      Staff.countDocuments(),
      Staff.countDocuments({ status: "active" }),
      Staff.countDocuments({ status: "inactive" }),
      Staff.aggregate([
        { $group: { _id: "$role", count: { $sum: 1 } } },
      ]),
    ]);

    return res.status(200).json({
      status: 200,
      message: "Staff statistics fetched successfully",
      data: {
        totalStaff,
        activeStaff,
        inactiveStaff,
        staffByRole,
      },
    });
  } catch (error: any) {
    console.log("Error fetching staff statistics:", error);

    return res.status(500).json({
      status: 500,
      message: "Failed to fetch statistics",
      error: error.message,
    });
  }
}

// ✅ Update staff permissions
export async function updateStaffPermissions(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { permissions } = req.body;

    if (!Array.isArray(permissions)) {
      return res.status(400).json({ message: "Permissions must be an array" });
    }

    const staff = await Staff.findById(id);
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }

    staff.permissions = permissions;
    await staff.save();

    return res.status(200).json({
      status: 200,
      message: "Staff permissions updated successfully",
      staff,
    });
  } catch (error: any) {
    console.log("Error updating permissions:", error);

    return res.status(500).json({
      status: 500,
      message: "Failed to update permissions",
      error: error.message,
    });
  }
}

