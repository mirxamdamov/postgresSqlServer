import { Sequelize } from "sequelize";
export const newSequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'mirzafar123',
    database: 'intex',
    logging:false
});