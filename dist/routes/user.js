"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// View list of available groceries
router.get("/groceries", userController_1.viewGroceries);
// Create a new order
router.post("/orders", userController_1.createOrder);
// Get details of a specific order
router.get("/orders/:id", userController_1.getOrderDetails);
exports.default = router;
