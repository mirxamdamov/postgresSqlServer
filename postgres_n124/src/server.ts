import { Application } from "express";
import express from 'express';
import { newSequelize } from "./config";
import "./model/index";
import routerAuth from "./router/auth.routes";
import cors from 'cors';
import 'dotenv/config'
import routerProducts from "./router/products.routes";
import routerOrders from "./router/orders.routes";

const app: Application = express();

async function main() {
    try {
        app.use(express.json());
        app.use(cors());
        app.use(express.static('uploads'));
        app.use(routerAuth);
        app.use(routerProducts);
        app.use(routerOrders);
        await newSequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.log(error);
    }
}

main();

app.listen(4000, () => console.log('Server is running on port 4000'));
