import { searchHotels } from "../controllers/hotels.controller";
import express from "express";

const router = express.Router();

router.get("/search", searchHotels);

export default router;
