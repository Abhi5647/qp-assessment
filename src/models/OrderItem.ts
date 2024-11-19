import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class OrderItem extends Model {}

OrderItem.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    order_id: { type: DataTypes.INTEGER, allowNull: false },
    grocery_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: "order_item", timestamps: false }
);

export default OrderItem;
