"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./auth");
const orders_1 = require("./orders");
const product_1 = require("./product");
function model() {
    return __awaiter(this, void 0, void 0, function* () {
        yield auth_1.Auth.sync({ alter: true });
        yield product_1.Products.sync({ alter: true });
        yield orders_1.Orders.sync({ alter: true });
        auth_1.Auth.belongsToMany(product_1.Products, { through: orders_1.Orders, foreignKey: 'user_id', });
        product_1.Products.belongsToMany(auth_1.Auth, { through: orders_1.Orders, foreignKey: 'product_id' });
    });
}
model();
