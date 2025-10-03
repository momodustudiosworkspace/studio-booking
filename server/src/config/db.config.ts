import mongoose from "mongoose";

export const connectDB = async ():Promise<void> => {
 try {
     const mongoURI = process.env['MONGODB_URI'];
     if (!mongoURI) throw new Error("MONGO_URL is not defined in the environment")
     
     await mongoose.connect(mongoURI);
     process.on('SIGINT', async () => {
         await mongoose.connection.close()
         process.exit(0)
     })
 } catch (error) {
    throw new Error(`Failed to connect to mongoDB: ${error}`)
 }   
}

export const disconnectDB = async (): Promise<void>=>{
    try {
        await mongoose.connection.close();
    } catch (error) {
        
    }
}