import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

export const GetMid = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization) {
            return res.status(404).send({
                error: {
                    message: 'tokeniz yo'
                },
                data: null,
                status: 404
            })
        }
        const tokenVerify = jwt.verify(req.headers.authorization, 'olma')
        if (!tokenVerify) {
            return res.status(404).send({
                error: {
                    message: 'invalit tokenn'
                },
                data: null,
                status: 404
            })
        } else{ 
            next()
        }       
    } catch (error:any) {
        if (error.message = 'invalid token') {
            res.status(404).send({
                error: {
                    message: 'invalit token'
                },
                data: null,
                status: 404
            })
        }
    }
}   