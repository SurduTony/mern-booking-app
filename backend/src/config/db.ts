import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
    console.log("MongoDB connected: " + process.env.MONGODB_CONNECTION_STRING);
  } catch (error) {
    console.error("Error connecting to MongoDB: " + error);
    process.exit(1); // 1 means there was an error, 0 means success
  }
};
