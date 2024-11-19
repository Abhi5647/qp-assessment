"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderDetails = exports.createOrder = exports.viewGroceries = void 0;
const Grocery_1 = __importDefault(require("../models/Grocery"));
const Order_1 = __importDefault(require("../models/Order"));
const OrderItem_1 = __importDefault(require("../models/OrderItem"));
const database_1 = __importDefault(require("../config/database"));
const sequelize_1 = require("sequelize");
// View all available groceries
const viewGroceries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groceries = yield Grocery_1.default.findAll({ where: { stock: { [sequelize_1.Op.gt]: 0 }, } });
        res.status(200).json(groceries);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch groceries" });
    }
});
exports.viewGroceries = viewGroceries;
// Create a new order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield database_1.default.transaction();
    try {
        const { user_id, items } = req.body; // `items` is an array of { grocery_id, quantity }
        // Calculate total price
        let totalPrice = 0;
        for (const item of items) {
            const grocery = yield Grocery_1.default.findByPk(item.grocery_id);
            if (!grocery || grocery.stock < item.quantity) {
                throw new Error(`Insufficient stock for grocery ID: ${item.grocery_id}`);
            }
            totalPrice += grocery.price * item.quantity;
            // Deduct stock
            grocery.stock -= item.quantity;
            yield grocery.save({ transaction });
        }
        // Create order
        const order = yield Order_1.default.create({ user_id, total_price: totalPrice }, { transaction });
        // Add order items
        for (const item of items) {
            yield OrderItem_1.default.create({ order_id: order.id, grocery_id: item.grocery_id, quantity: item.quantity }, { transaction });
        }
        yield transaction.commit();
        res.status(201).json({ message: "Order created successfully", order });
    }
    catch (error) {
        yield transaction.rollback();
        res.status(500).json({ error: "Failed to create order" });
    }
});
exports.createOrder = createOrder;
// Get order details
const getOrderDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const order = yield Order_1.default.findByPk(id, {
            include: [
                {
                    model: OrderItem_1.default,
                    include: [
                        {
                            model: Grocery_1.default, // Correctly include the Grocery model here
                        },
                    ],
                },
            ],
        });
        if (order) {
            res.status(200).json(order);
        }
        else {
            res.status(404).json({ error: "Order not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch order details" });
    }
});
exports.getOrderDetails = getOrderDetails;
