import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Grocery extends Model {
    stock: any;
    price: any;
}

Grocery.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  { sequelize, modelName: "grocery", timestamps: true }
);

export default Grocery;
