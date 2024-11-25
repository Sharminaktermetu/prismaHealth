import { Request, Response } from "express";
import { userService } from "./user.service";
import { error } from "console";

const createAdmin =async(req:Request,res:Response)=>{
    
    try {
        const result =await userService.createAdmin(req.body)

    res.status(200).send({
        success:true,
        message:"Admin created Successfully",
        data:result
    })
    } catch (err) {
        res.status(500).send({
            success:false,
            message: "Something went wrong",
            error:err
            
        })
    }
}

export  const userController ={
    createAdmin
}