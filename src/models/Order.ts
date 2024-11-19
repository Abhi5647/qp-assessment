import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Order extends Model {
    id: any;
}

Order.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    total_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  },
  { sequelize, modelName: "order", timestamps: true }
);

export default Order;
