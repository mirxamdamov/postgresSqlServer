import { Request, Response } from "express";
import { Auth } from "../model/auth";
import * as bcrypt from 'bcrypt'
import { userType } from "../types";
import * as jwt from "jsonwebtoken";


export const signup = async (req: Request, res: Response) => {
    try {
        if (!req.body.username || !req.body.password || !req.body.email) {
            res.send("Username yoki email yoki password yo'q");
            return;
        }

        await Auth.create({
            username: req.body.username,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
        })
        const Userid = await Auth.findOne({ where: { username: req.body.username } })
        const Userid2: any = (Userid as userType).id
        const token = jwt.sign(Userid2, 'olma')
        res.status(201).send({
            status: 201,
            data: {
                token
            },
            err: null
        })

    } catch (error) {
        console.log(error);
    }
}
export const signin = async (req: Request, res: Response) => {
    try {
        const userUsername: any = await Auth.findOne({ where: { email: req.body.email } })
        const userPassword: string = userUsername.password
        const reqPassword: string = req.body.password
        if (userUsername === null) {
            res.status(404).send('User not fount')
            return;
        }
        const password = (await bcrypt.compare(reqPassword, userPassword))
        if (password) {
            res.send({
                status: 200,
                data: jwt.sign(userUsername.id, 'olma'),
                err: null
            })
        } else {
            res.status(405).send('invalit password')
        }

    } catch (error) {
        res.status(500).send(error);
    }
}
export const UsersGet = async (req: Request, res: Response) => {
    const users = await Auth.findAll({
        attributes: [
            'id',
            "username",
            "email",
            "password"
        ]
    });
    await Promise.all(users.map(async (user) => {
        const products = await user.getProducts({
            attributes: ["id",
                "title",
                "price",
                "description",
                "category",
                "image",
                "rate",
                "count",
            ]
        })

        products.map(async (product: any) => {
            delete product.dataValues.Orders
        })


        user.dataValues.products = products
    }))
    res.send(users)
}
export const UserGet =async (req:Request,res:Response) => {
   try {
       const token: any = req.headers.authorization

       
       const id = jwt.verify(token, 'olma')
       const users = await Auth.findOne({
           where: { id: id },
       });

       res.send(users)
   } catch (error:any) {
    console.log(error.message);
   }
}
export const userPut = async (req: Request, res: Response) => {
    const token: any = req.headers.authorization  
    const userId = jwt.verify(token,'olma');
    const { username} = req.body;
if (!username) {
    return res.status(404).send('invalid Username')
}


    try {
        const user:any = await Auth.findOne({ where: { id: userId }});

        if (!user) {
            return res.status(404).send('User not found');
        }

        user.username = username;
        await user.save();

        return res.status(200).send('User updated successfully');

}catch(err){
    console.log(err);
    
}
} 