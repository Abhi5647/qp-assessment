import express from "express";
import {
  viewGroceries,
  createOrder,
  getOrderDetails,
} from "../controllers/userController";

const router = express.Router();

// View list of available groceries
router.get("/groceries", viewGroceries);

// Create a new order
router.post("/orders", createOrder);

// Get details of a specific order
router.get("/orders/:id", getOrderDetails);

export default router;
