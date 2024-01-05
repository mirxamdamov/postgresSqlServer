import { Sequelize } from "sequelize";
import { newSequelize } from "../config/index";
import { Auth } from "./auth";
import { Orders as orders_model } from "./orders";
import { Products } from "./product";
import { Catigory } from "./catigory";
import { Orders_catigory } from "./orders_ctigory";

export async function model() {
  Auth.belongsToMany(Products, { through:orders_model, foreignKey: "auth_id" });
  Products.belongsToMany(Auth, { through:orders_model,foreignKey: "product_id" });
  Products.belongsToMany(Catigory, {
    through: Orders_catigory,
    foreignKey: "product_id",
  });
  Catigory.belongsToMany(Products, {
    through: Orders_catigory,
    foreignKey: "catigory_id",
  });

  // Ma'lumotlar bazasini yangilash
  await newSequelize.sync({ alter: true });

  await testAssociations();
}

async function testAssociations() {
  try {
    await Products.findAll({
      include: Auth,
    });
    await Products.findAll({
      include:Catigory
    })
    console.log("Bog'lanishlar muvaffaqiyatli tekshirildi.");
  } catch (error) {
    console.error("Bog'lanishlar tekshirishida xatolik yuz berdi:", error);
  }
}
