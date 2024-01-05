import { DataTypes, Model } from "sequelize";
import { newSequelize } from "../config/index";


export class Catigory extends Model {};

Catigory.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    title: {
        type: DataTypes.TEXT,
    }
}, {
    tableName: 'catigory',
    sequelize: newSequelize,
})
