"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../config/index");
class Auth extends sequelize_1.Model {
}
exports.Auth = Auth;
;
Auth.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    username: {
        type: sequelize_1.DataTypes.TEXT
    },
    email: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.TEXT
    }
}, {
    tableName: 'Auth',
    sequelize: index_1.newSequelize,
});
