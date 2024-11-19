"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const router = express_1.default.Router();
// Add a new grocery item
router.post("/groceries", adminController_1.addGrocery);
// Get all grocery items
router.get("/groceries", adminController_1.getGroceries);
// Update grocery details (e.g., name, price)
router.patch("/groceries/:id", adminController_1.updateGrocery);
// Delete a grocery item
router.delete("/groceries/:id", adminController_1.deleteGrocery);
// Update inventory levels
router.patch("/groceries/:id/inventory", adminController_1.updateInventory);
exports.default = router;
