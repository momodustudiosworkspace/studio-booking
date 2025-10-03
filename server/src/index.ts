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


app.listen(5000, () => {
    console.log("Working Yay!");
    
})
connectDB().catch((err) => {
    console.log(err); 
})