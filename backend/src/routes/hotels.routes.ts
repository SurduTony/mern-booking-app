import { getHotel, searchHotels } from "../controllers/hotels.controller";
import { param } from "express-validator";
import express from "express";

const router = express.Router();

router.get("/search", searchHotels);

router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel ID is required")],
  getHotel
);

export default router;
