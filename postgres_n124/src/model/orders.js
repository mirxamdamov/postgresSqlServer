"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../config/index");
class Orders extends sequelize_1.Model {
}
exports.Orders = Orders;
;
Orders.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    product_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    tableName: 'orders',
    sequelize: index_1.newSequelize,
});
