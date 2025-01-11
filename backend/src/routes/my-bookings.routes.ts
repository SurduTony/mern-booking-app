import { getMyBookings } from "../controllers/my-bookings.controller";
import express from "express";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.get("/", verifyToken, getMyBookings);

export default router;
