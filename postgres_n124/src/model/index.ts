import { Auth } from "./auth";
import { Orders as orders_model } from "./orders";
import { Products } from "./product";

async function model() {
    await Auth.sync({ alter: true })
    await Products.sync({ alter: true })
    await orders_model.sync({ alter: true })
    Auth.belongsToMany(Products, { through: orders_model, foreignKey: 'user_id', });
    Products.belongsToMany(Auth, { through: orders_model, foreignKey: 'product_id' });
}

model()