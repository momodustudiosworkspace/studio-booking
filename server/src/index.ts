import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.config";
import swaggerUI from "swagger-ui-express"
import swaggerOpenapiSpecification from "./config/swagger.config";
import morgan from "morgan"



// API routes  

// Admin API routes 
import adminDashboardRoutes from "./routes/admin/dashboard.routes"
import adminBookingRoutes from "./routes/admin/booking.routes"
import adminUsersRoutes from "./routes/admin/user.routers"
import adminPayments from "./routes/admin/payment.routes"
import sessionRoutes from "./routes/admin/session.route"
import packageRoutes from "./routes/admin/package.routes"
import staffRoutes from "./routes/admin/staff.routes"



// User API routes 
import authRoutes from "./routes/user/auth.routes"
import bookingRoutes from "./routes/user/booking.routes";
import packagesRoutes from "./routes/user/packages.routes"
import paymentRoutes from "./routes/user/payment.routes"
import userRouters from "./routes/user/user.routers"
import { moniepointWebhook } from "./controllers/webhooks/moniepoint.webhook";



dotenv.config()



const app = express()


// ✅ RAW body ONLY for Moniepoint webhook
app.post(
  "/webhooks/moniepoint",
  express.raw({ type: "application/json" }),
 moniepointWebhook
);


app.use(cors())
app.use(express.json())
app.use(morgan("dev"))


// swagger endpoints 
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerOpenapiSpecification));


// Admin endpoints
app.use("/api/admin/dashboard", adminDashboardRoutes )
app.use("/api/admin/bookings", adminBookingRoutes )
app.use("/api/admin/users", adminUsersRoutes )
app.use("/api/admin/payments", adminPayments)
app.use("/api/admin/sessions", sessionRoutes);
app.use("/api/admin/packages", packageRoutes);
app.use("/api/admin/staff", staffRoutes);



// User endpoint  
app.use("/api/auth", authRoutes)
app.use("/api/bookings", bookingRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/user",userRouters) 


// Packages endpoint 
app.use("/api/bookings/packages", packagesRoutes)




// async function handlePaymentSuccess(data:{reference:string, amount:number}) {
//   const reference = data.reference;

//   // Example:
//   // reference = BOOKING_abc123

//   const booking = await Booking.findOne({ reference });

//   if (!booking) {
//     console.error("Booking not found for reference:", reference);
//     return;
//   }

//   booking.paymentStatus = "success";
//   // booking. = new Date();
//   booking.price = data.amount;

//   await booking.save();

//   console.log("✅ Booking marked as PAID:", reference);
// }




const PORT = process.env['PORT'] || 5000;


(async () => {
  try { 
    await connectDB(); // 👈 wait for DB connection
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Failed to connect to DB", err);
    process.exit(1); // Exit if DB connection fails
  }
})();