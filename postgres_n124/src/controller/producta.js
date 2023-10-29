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
exports.getFile = exports.addProducts = exports.getProduct = exports.getProducts = void 0;
const product_1 = require("../model/product");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield product_1.Products.findAll());
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield product_1.Products.findOne({ where: { id: req.params.id } }));
});
exports.getProduct = getProduct;
const addProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.title || !req.body.price || !req.body.description || !req.body.category || !req.body.rate || !req.body.count) {
        res.status(404).send("Malumotlar to'liq qo'shilmagan");
        return;
    }
    const file = req.file;
    yield product_1.Products.create({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: `http://localhost:4000/products/${file === null || file === void 0 ? void 0 : file.originalname}`,
        rate: req.body.rate,
        count: req.body.count
    });
    res.send(yield product_1.Products.findAll());
});
exports.addProducts = addProducts;
const getFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.params.file;
    res.sendFile(`${process.cwd()}/uploads/${filename}`);
});
exports.getFile = getFile;
