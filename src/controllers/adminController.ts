import { Request, Response } from "express";
import Grocery from "../models/Grocery";

// Add a new grocery item
export const addGrocery = async (req: Request, res: Response) => {
  try {

    const grocery = await Grocery.create(req.body);
    res.status(201).json(grocery);
  } catch (error) {
    res.status(500).json({ error: "Failed to add grocery" });
  }
};

// Get all groceries
export const getGroceries = async (req: Request, res: Response) => {
  try {
    const groceries = await Grocery.findAll();
    res.status(200).json(groceries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch groceries" });
  }
};

// Update grocery details
export const updateGrocery = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await Grocery.update(req.body, { where: { id } });
    if (updated[0]) {
      res.status(200).json({ message: "Grocery updated successfully" });
    } else {
      res.status(404).json({ error: "Grocery not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update grocery" });
  }
};

// Delete a grocery item
export const deleteGrocery = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Grocery.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ message: "Grocery deleted successfully" });
    } else {
      res.status(404).json({ error: "Grocery not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete grocery" });
  }
};

// Update inventory levels
export const updateInventory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;
    const updated = await Grocery.update({ stock }, { where: { id } });
    if (updated[0]) {
      res.status(200).json({ message: "Inventory updated successfully" });
    } else {
      res.status(404).json({ error: "Grocery not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update inventory" });
  }
};
