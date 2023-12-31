import { DataTypes, Model } from "sequelize";
import { newSequelize } from "../config/index";

export class Orders extends Model {}

Orders.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    auth_id: {
      type: DataTypes.INTEGER,
    },
    product_id: {
      type: DataTypes.INTEGER, // <<-- INTEGER turiga o'zgartirildi
    },
  },
  {
    tableName: "Orders",
    sequelize: newSequelize,
  }
);