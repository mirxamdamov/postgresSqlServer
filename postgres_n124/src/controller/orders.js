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
exports.addOrders = void 0;
const orders_1 = require("../model/orders");
const addOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.user_id || !req.body.product_id) {
        return res.status(404).send("malumotlar to'liq kiritilmagan");
    }
    yield orders_1.Orders.create({
        user_id: req.body.user_id,
        product_id: req.body.product_id
    });
    res.send(yield orders_1.Orders.findAll());
});
exports.addOrders = addOrders;
