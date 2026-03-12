import { validationResult } from "express-validator";
import { UserModel } from "./postgres.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await UserModel.findAndCountAll({
      attributes: { exclude: ["password"] },
      limit: limit,
      offset: offset,
      order:[["id","ASC"]]
    });

    if (rows.length === 0) {
      return res.status(404).json({message: "No employees found"});
    }

    return res.status(200).json({
      totalUsers: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      users: rows
    });

  } catch (error) {
    next(error);
  }
};

//src user
export const getId = async (req, res, next) => {
  const empid = req.params.empid;
  try {
    const emp = await UserModel.findOne({where: { empid }, attributes: {exclude:["password"]}});

    if (!emp) {
      return res.status(404).json({message: "Employee not found"});
    }
    res.status(200).json(emp);

  } catch (error) {
    res.status(500).json({message: "Internal server error"});
  }
};

//Register user
export const postEmp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  const { name, email, password, designation, empid,role } = req.body;

  try {
    const exist = await UserModel.findOne({where: { empid }});

    if (exist) {
      return res.status(409).json({message: "Employee already exists"});
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = await UserModel.create({name, email, password: hashedPassword, designation, empid, role});
    res.status(201).json(employee);

  } catch (error)  {
    next(error);
  }
};

export const login= async(req,res, next)=>{
  const {email,password}=req.body;
  const user = await UserModel.findOne({where:{email}});
  try{
    if(!user){
      return res.status(404).json({message:"Not found"});
    }

    const match = await bcrypt.compare(password,user.password);
    if(!match){
      return res.status(401).json({message:"Wrong password"});
    }

    const token = jwt.sign(
      { id:user.id, role:user.role },
      process.env.JWT_SECRET,
      { expiresIn:"1h" }
    );
    return res.json({message: "Login success",token: token});
  }catch (error) {
    next(error);
  }
};

export const putEmp = async (req, res, next) => {

  const { name, email, password, designation } = req.body;

  try {
    const user = await UserModel.findOne({where: { empid: req.params.empid }});
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }
    let updateData = {name, email, designation};

    // nếu có password mới thì hash
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }
    await user.update(updateData);
    res.json({message: "User updated successfully"});

  } catch(error) {
    next(error);
  }
};

export const deleteEmp = async (req, res, next) => {
  const empid = req.params.empid;
  try {
    const emp = await UserModel.findOne({where: { empid }});

    if (!emp) {
      return res.status(404).json({message: "Employee not found"});
    }
    await emp.destroy();

    res.json({message: "Deleted successfully"});

  } catch (error)  {
    next(error);
  }
};