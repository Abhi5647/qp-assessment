import { Request, Response } from "express";
import Grocery from "../models/Grocery";
import Order from "../models/Order";
import OrderItem from "../models/OrderItem";
import sequelize from "../config/database";
import { Op } from "sequelize";

// View all available groceries
export const viewGroceries = async (req: Request, res: Response) => {
  try {
    const groceries = await Grocery.findAll({ where: {  stock: { [Op.gt]: 0 }, } });
    res.status(200).json(groceries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch groceries" });
  }
};

// Create a new order
export const createOrder = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction();
  try {
    const { user_id, items } = req.body; // `items` is an array of { grocery_id, quantity }

    // Calculate total price
    let totalPrice = 0;
    for (const item of items) {
      const grocery = await Grocery.findByPk(item.grocery_id);
      if (!grocery || grocery.stock < item.quantity) {
        throw new Error(`Insufficient stock for grocery ID: ${item.grocery_id}`);
      }
      totalPrice += grocery.price * item.quantity;

      // Deduct stock
      grocery.stock -= item.quantity;
      await grocery.save({ transaction });
    }

    // Create order
    const order = await Order.create({ user_id, total_price: totalPrice }, { transaction });

    // Add order items
    for (const item of items) {
      await OrderItem.create(
        { order_id: order.id, grocery_id: item.grocery_id, quantity: item.quantity },
        { transaction }
      );
    }

    await transaction.commit();
    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: "Failed to create order" });
  }
};

// Get order details
export const getOrderDetails = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      const order = await Order.findByPk(id, {
        include: [
          {
            model: OrderItem,
            include: [
              {
                model: Grocery, // Correctly include the Grocery model here
              },
            ],
          },
        ],
      });
  
      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).json({ error: "Order not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch order details" });
    }
  };
