import { Router } from "express";
import { GetMid } from "../middleware";
import { addOrders } from "../controller/orders";


const routerOrders = Router()

routerOrders.post('/orders',GetMid, addOrders)

export default routerOrders