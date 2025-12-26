import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.config";
import Booking from "../models/booking.models";



export const bookingsMediaStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req: any, file) => {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      throw new Error("Booking not found");
    }

    const clientId = booking.user.toString();
    const sessionTitle = booking.sessionTitle.replace(/\s+/g, "_");

    return {
      folder: `clients/${clientId}/${sessionTitle}/${booking._id}/originals`,
      resource_type: "auto",
      // allowed_formats: ["jpg", "jpeg", "png"],
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
    };
  },
});
