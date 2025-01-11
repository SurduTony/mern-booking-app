import {
  getHotel,
  searchHotels,
  createPaymentIntent,
  createBooking,
} from "../controllers/hotels.controller";
import { param } from "express-validator";
import express from "express";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.get("/search", searchHotels);

router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel ID is required")],
  getHotel
);

router.post(
  "/:hotelId/bookings/payment-intent",
  verifyToken,
  createPaymentIntent
);

router.post("/:hotelId/bookings", verifyToken, createBooking);

export default router;
