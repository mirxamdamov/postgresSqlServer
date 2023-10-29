import { Router } from "express";
import { UserGet, UsersGet, signin, signup, userPut } from "../controller/auth";
import { GetMid } from "../middleware";


const routerAuth = Router()

routerAuth.post('/signup', signup)
routerAuth.post('/signin',signin)
routerAuth.get('/users', GetMid, UsersGet as any)
routerAuth.get('/user', GetMid, UserGet as any)
routerAuth.put('/user', userPut as any)

export default routerAuth