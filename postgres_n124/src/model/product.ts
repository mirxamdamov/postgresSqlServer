import { DataTypes, Model } from "sequelize";
import { newSequelize } from "../config/index";


export class Products extends Model { };

Products.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    title: {
        type: DataTypes.TEXT,
    },
    price: {
        type: DataTypes.INTEGER
    },
    description: {
        type: DataTypes.TEXT
    },
    category: {
        type: DataTypes.TEXT
    },
    image: {
        type: DataTypes.TEXT
    },
    rate: {
        type: DataTypes.INTEGER
    },
    count: {
        type: DataTypes.INTEGER
    }

}, {
    tableName: 'products',
    sequelize: newSequelize,
})
