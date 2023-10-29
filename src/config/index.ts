import { Sequelize } from "sequelize";

export const newSequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    database: 'n124',
    password: 'mirzafar123',
    username: 'postgres',
    logging: false
});

