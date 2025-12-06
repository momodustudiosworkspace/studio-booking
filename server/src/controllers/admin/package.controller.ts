import { Request, Response } from "express";
import Package from "../../models/package.models";

// **********************************************
// ✅ Create Package
// **********************************************
export async function createPackage(req: Request, res: Response) {
  try {
    const { session, title, price, discount, services } = req.body;

    if (!session) {
      return res.status(400).json({ message: "Session ID is required" });
    }

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Package title is required" });
    }

    if (!price || price < 0) {
      return res.status(400).json({ message: "Valid price is required" });
    }

    // Check duplicate package title for same session
    const existing = await Package.findOne({ title, session });
    if (existing) {
      return res.status(409).json({
        status: 409,
        message: "A package with this title already exists for this session",
      });
    }

    const pkg = await Package.create({
      session,
      title,
      price,
      discount: discount ?? 0,
      services: services ?? [],
    });

    return res.status(200).json({
      status: 200,
      message: "Package created successfully",
      data: pkg,
    });
  } catch (error: any) {
    console.log("Create package error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        status: 409,
        message: "Duplicate package title",
      });
    }

    return res.status(500).json({
      status: 500,
      message: "Failed to create package",
      error: error.message,
    });
  }
}

// **********************************************
// ✅ Update Package
// **********************************************
export async function updatePackage(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { title, price, discount, services } = req.body;

    const pkg = await Package.findById(id);
    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Package title is required" });
    }

    // Check duplicates excluding itself
    const existing = await Package.findOne({
      title,
      session: pkg.session,
      _id: { $ne: id },
    });

    if (existing) {
      return res.status(409).json({
        status: 409,
        message: "Another package already uses this title for this session",
      });
    }

    pkg.title = title;
    if (price !== undefined) pkg.price = price;
    if (discount !== undefined) pkg.discount = discount;
    if (services !== undefined) pkg.services = services;

    await pkg.save();

    return res.status(200).json({
      status: 200,
      message: "Package updated successfully",
      data: pkg,
    });

  } catch (error: any) {
    console.log("Update package error:", error);

    if (error.code === 11000) {
      return res.status(409).json({ message: "Duplicate package title" });
    }

    return res.status(500).json({
      status: 500,
      message: "Failed to update package",
      error: error.message,
    });
  }
}

// **********************************************
// ✅ Delete Package
// **********************************************
export async function deletePackage(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const pkg = await Package.findById(id);
    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }

    await pkg.deleteOne();

    return res.status(200).json({
      status: 200,
      message: "Package deleted successfully",
    });

  } catch (error: any) {
    console.log("Delete package error:", error);

    return res.status(500).json({
      status: 500,
      message: "Failed to delete package",
      error: error.message,
    });
  }
}

// **********************************************
// ✅ Get All Packages (with filters & pagination)
// **********************************************
export async function getAllPackages(req: Request, res: Response) {
  try {
    const { sessionId } = req.query;

  
console.log("sessionId: ", sessionId);

   

    // const total = await Package.countDocuments(query);

    const packages = await Package.find({ session: sessionId })
      // .populate("session")
      .sort({ title: -1 })
      // .skip((Number(page) - 1) * Number(limit))
      // .limit(Number(limit));

    return res.status(200).json({
      status: 200,
      message: "Packages fetched successfully",
      data: packages,
      // pagination: {
      //   total,
      //   page: Number(page),
      //   limit: Number(limit),
      //   pages: Math.ceil(total / Number(limit)),
      // },
    });

  } catch (error: any) {
    console.log("Get packages error:", error);

    return res.status(500).json({
      status: 500,
      message: "Failed to fetch packages",
      error: error.message,
    });
  }
}

// **********************************************
// ✅ Get Single Package
// **********************************************
export async function getPackage(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const pkg = await Package.findById(id).populate("session");

    if (!pkg) {
      return res.status(404).json({
        status: 404,
        message: "Package not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Package fetched successfully",
      data: pkg,
    });

  } catch (error: any) {
    console.log("Get package error:", error);

    return res.status(500).json({
      status: 500,
      message: "Failed to fetch package",
      error: error.message,
    });
  }
}
