"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newSequelize = void 0;
const sequelize_1 = require("sequelize");
exports.newSequelize = new sequelize_1.Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    database: 'n124',
    password: 'mirzafar123',
    username: 'postgres',
    logging: false
});
