import { Request, Response } from "express";
import { adminServices } from "./admin.service";
import pick from "../../../shared/pick";
import { filterfields } from "./admin.constant";

const getAllAdmins =async(req:Request,res:Response)=>{
    try {
      const filters =pick(req.query,filterfields)
      const options =pick(req.query,['limit','page','orderBy','sortBy'])
        const result =await adminServices.getAllAdmins(filters,options)

        res.status(200).send({
            success:true,
            message:"Admin retrive Successfully",
            meta:result.meta,
            data:result.data
        })
    } catch (err) {
        res.status(500).send({
            success:false,
            message:"Something went wrong",
            error:err
            
        })
    }
}
export const adminControllers ={
    getAllAdmins
}