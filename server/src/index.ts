import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.config";
import swaggerUI from "swagger-ui-express"
import swaggerOpenapiSpecification from "./config/swagger.config";
import morgan from "morgan"

// Auth router 
import authRoutes from "./routes/auth.routes"



dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))


// swagger endpoints 
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerOpenapiSpecification));

// auth endpoints 
app.use("/api/auth", authRoutes)

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