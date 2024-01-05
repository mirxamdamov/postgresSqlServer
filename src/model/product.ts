import { DataTypes, Model } from "sequelize";
import { newSequelize } from "../config/index";


export class Products extends Model { };

Products.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    chegPrice: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.TEXT,
    },
    ramka: {
      type: DataTypes.TEXT,
    },
    tavsiya: {
      type: DataTypes.BOOLEAN,
    },
    catigory_id:{
      type:DataTypes.INTEGER
    }
  },
  {
    tableName: "Product1",
    sequelize: newSequelize,
  }
);
