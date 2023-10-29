"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_config_1 = __importDefault(require("../config/multer.config"));
const producta_1 = require("../controller/producta");
const routerProducts = (0, express_1.Router)();
routerProducts.post('/products', multer_config_1.default.single("file"), producta_1.addProducts);
routerProducts.get('/products', producta_1.getProducts);
routerProducts.get('/product/:id', producta_1.getProduct);
routerProducts.get('/products/:file', producta_1.getFile);
exports.default = routerProducts;
