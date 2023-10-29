import { Router } from "express";
import upload from "../config/multer.config";
import { addProducts, getFile, getProduct, getProducts } from "../controller/producta";


const routerProducts = Router()

routerProducts.post('/products', upload.single("file"), addProducts)
routerProducts.get('/products',  getProducts as any)
routerProducts.get('/product/:id',  getProduct as any)
routerProducts.get('/products/:file',  getFile as any)


export default routerProducts