import express from "express";
import {
  addGrocery,
  getGroceries,
  updateGrocery,
  deleteGrocery,
  updateInventory,
} from "../controllers/adminController";

const router = express.Router();

// Add a new grocery item
router.post("/groceries", addGrocery);

// Get all grocery items
router.get("/groceries", getGroceries);

// Update grocery details (e.g., name, price)
router.patch("/groceries/:id", updateGrocery);

// Delete a grocery item
router.delete("/groceries/:id", deleteGrocery);

// Update inventory levels
router.patch("/groceries/:id/inventory", updateInventory);

export default router;
