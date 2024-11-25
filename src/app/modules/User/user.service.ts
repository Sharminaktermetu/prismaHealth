import { UserRole } from "@prisma/client"
import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";

const createAdmin =async(data:any)=>{
    const hashedPassword:string = await bcrypt.hash(data.password,12)
    
    const userData  ={
        email:data.admin.email,
        password:hashedPassword,
        role: UserRole.ADMIN
     
    }

    const result =await prisma.$transaction(async (transactionClient)=>{
    await transactionClient.user.create({
            data:userData
        })
        const createAdmin = transactionClient.admin.create({
            data:data.admin
        })
        return createAdmin
    })
    return result
}

export const userService ={
    createAdmin
}