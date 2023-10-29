"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../config/index");
class Products extends sequelize_1.Model {
}
exports.Products = Products;
;
Products.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    title: {
        type: sequelize_1.DataTypes.TEXT,
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER
    },
    description: {
        type: sequelize_1.DataTypes.TEXT
    },
    category: {
        type: sequelize_1.DataTypes.TEXT
    },
    image: {
        type: sequelize_1.DataTypes.TEXT
    },
    rate: {
        type: sequelize_1.DataTypes.INTEGER
    },
    count: {
        type: sequelize_1.DataTypes.INTEGER
    }
}, {
    tableName: 'products',
    sequelize: index_1.newSequelize,
});
