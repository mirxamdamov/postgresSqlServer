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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
require("./model/index");
const auth_routes_1 = __importDefault(require("./router/auth.routes"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const products_routes_1 = __importDefault(require("./router/products.routes"));
const orders_routes_1 = __importDefault(require("./router/orders.routes"));
const app = (0, express_1.default)();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            app.use(express_1.default.json());
            app.use((0, cors_1.default)());
            app.use(express_1.default.static('uploads'));
            app.use(auth_routes_1.default);
            app.use(products_routes_1.default);
            app.use(orders_routes_1.default);
            yield config_1.newSequelize.authenticate();
            console.log('Connection has been established successfully.');
        }
        catch (error) {
            console.log(error);
        }
    });
}
main();
app.listen(4000, () => console.log('Server is running on port 4000'));
