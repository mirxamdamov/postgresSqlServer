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
    phone_number: {
        type: DataTypes.TEXT,
    },
    location: {
        type: DataTypes.TEXT
    },
    time:{
        type:DataTypes.TEXT
    },
    isAdmin:{
        type:DataTypes.BOOLEAN
    }
}, {
    tableName: 'Auth',
    sequelize: newSequelize,
})
