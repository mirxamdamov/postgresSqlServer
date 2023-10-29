import { DataTypes, Model } from "sequelize";
import { newSequelize } from "../config/index";


export class Auth extends Model {
    getProducts: any;
    products: any;
    // Products: any;
};

Auth.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    username: {
        type: DataTypes.TEXT
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'Auth',
    sequelize: newSequelize,
})
