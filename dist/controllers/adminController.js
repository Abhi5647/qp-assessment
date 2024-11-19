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
exports.updateInventory = exports.deleteGrocery = exports.updateGrocery = exports.getGroceries = exports.addGrocery = void 0;
const Grocery_1 = __importDefault(require("../models/Grocery"));
// Add a new grocery item
const addGrocery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const grocery = yield Grocery_1.default.create(req.body);
        res.status(201).json(grocery);
    }
    catch (error) {
        console.log({ error });
        res.status(500).json({ error: "Failed to add grocery" });
    }
});
exports.addGrocery = addGrocery;
// Get all groceries
const getGroceries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groceries = yield Grocery_1.default.findAll();
        res.status(200).json(groceries);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch groceries" });
    }
});
exports.getGroceries = getGroceries;
// Update grocery details
const updateGrocery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updated = yield Grocery_1.default.update(req.body, { where: { id } });
        if (updated[0]) {
            res.status(200).json({ message: "Grocery updated successfully" });
        }
        else {
            res.status(404).json({ error: "Grocery not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update grocery" });
    }
});
exports.updateGrocery = updateGrocery;
// Delete a grocery item
const deleteGrocery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield Grocery_1.default.destroy({ where: { id } });
        if (deleted) {
            res.status(200).json({ message: "Grocery deleted successfully" });
        }
        else {
            res.status(404).json({ error: "Grocery not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete grocery" });
    }
});
exports.deleteGrocery = deleteGrocery;
// Update inventory levels
const updateInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { stock } = req.body;
        const updated = yield Grocery_1.default.update({ stock }, { where: { id } });
        if (updated[0]) {
            res.status(200).json({ message: "Inventory updated successfully" });
        }
        else {
            res.status(404).json({ error: "Grocery not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update inventory" });
    }
});
exports.updateInventory = updateInventory;
