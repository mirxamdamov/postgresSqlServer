import { Auth } from "../model/auth";

export interface userType extends Auth {
    id:number,
    username:string,
    email:string,
    password:string,
    createdAt:string,
    updatedAt:string
}
