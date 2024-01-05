import { DataTypes, Model } from "sequelize";
import { newSequelize } from "../config/index";

export class Orders_catigory extends Model {}

Orders_catigory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    catigory_id: {
      type: DataTypes.INTEGER,
    },
    product_id: {
      type: DataTypes.INTEGER
    },
  },
  {
    tableName: "OrdersC",
    sequelize: newSequelize,
  }
);
