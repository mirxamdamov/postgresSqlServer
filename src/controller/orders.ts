import { Request, Response } from "express";
import { Orders } from "../model/orders";
import { Auth } from "../model/auth";
import { Products } from "../model/product";

export const addOrders = async (req:Request,res:Response) => {
    if (!req.body.user_id || !req.body.product_id) {
        return res.status(404).send("malumotlar to'liq kiritilmagan" )
    }
    await Orders.create({
        user_id:req.body.user_id,
        product_id: req.body.product_id
    })
    res.send(await Orders.findAll())
}