import { DataTypes, Model } from "sequelize";
import { newSequelize } from "../config/index";


export class Orders extends Model { };

Orders.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
    product_id: {
        type: DataTypes.INTEGER,
    },

}, {
    tableName: 'orders',
    sequelize: newSequelize,
})
