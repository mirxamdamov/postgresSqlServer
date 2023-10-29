import { Request, Response } from "express";
import { Products } from "../model/product";
import fs from 'fs'
import path from 'path'

export const getProducts = async (req: Request, res: Response) => {
    res.send(await Products.findAll())
}
export const getProduct = async (req: Request, res: Response) => {
    res.send(await Products.findOne({ where: { id: req.params.id } }))
}
export const addProducts = async (req: Request, res: Response) => {
    if (!req.body.title || !req.body.price || !req.body.description || !req.body.category || !req.body.rate || !req.body.count) {
        res.status(404).send("Malumotlar to'liq qo'shilmagan");
        return;
    }
    const file = req.file
    await Products.create({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: `http://localhost:4000/products/${file?.originalname}`,
        rate: req.body.rate,
        count: req.body.count
    })

    res.send(await Products.findAll())
}
export const getFile = async (req: Request, res: Response) => {
    const filename = req.params.file;
    res.sendFile(`${process.cwd()}/uploads/${filename}`);
}