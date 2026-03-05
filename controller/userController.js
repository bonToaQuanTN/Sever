import { where } from "sequelize";
import { UserModel } from "../postgres/postgres.js";

export const getAll=async (req,res)=>{
    try {
        const users=await UserModel.findAll();
        if(users.length==0){
            return res.status(200).json({"error":"users not found"})
        }
        return res.status(200).json(users)
    } catch (e) {
        console.error('e')
        return res.status(500).json({"Error":"Internal server error"})
    }
}

export const postApi = async (req,res)=>{
    const {name,email,designation,empid} = req.body;

    try{
        const emp = await UserModel.findOne({where:{empid}});

        if(!emp){
            await UserModel.create({name, email, designation, empid});
            return res.status(201).json({
                message:"emp added successfully"
            });
        }

        return res.status(409).json({
            message:"Employee already exists"
        });

    } catch (e) {
        console.error(e);
        return res.status(500).json({
            message:"Internal server error"
        });
    }
}

export const putApi = async (req, res) => {
    //anh xa toi truong id
    const empid = req.params.empid;

    try {
        const [updated] = await UserModel.update(req.body, { where: { empid } });

        if (updated[0] === 0) {
            return res.status(404).json({message: "Not found"});
        }

        return res.status(200).json({message: "Update successfully"});

    } catch (e) {
        console.error(e);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};