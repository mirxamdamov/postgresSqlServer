"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../middleware");
const orders_1 = require("../controller/orders");
const routerOrders = (0, express_1.Router)();
routerOrders.post('/orders', middleware_1.GetMid, orders_1.addOrders);
exports.default = routerOrders;
