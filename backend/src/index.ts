import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db";

import path from "path";
import { configCloudinary } from "./config/cloudinary";

import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import myHotelRoutes from "./routes/my-hotels.routes";

const app = express();

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);

app.listen(7000, () => {
  console.log("Server running on localhost:7000");
  connectDB();
  configCloudinary();
});
