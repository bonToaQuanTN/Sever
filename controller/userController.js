import { validationResult } from "express-validator";
import { UserModel } from "../postgres/postgres.js";

export const getAll = async (req, res) => {
  try {
    const users = await UserModel.findAll();

    if (users.length === 0) {
      return res.status(404).json({message: "No employees found"});
    }
    return res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error"});
  }
};

export const getId = async (req, res) => {
  const empid = req.params.empid;
  try {
    const emp = await UserModel.findOne({where: { empid }});

    if (!emp) {
      return res.status(404).json({message: "Employee not found"});
    }
    res.json(emp);

  } catch (error) {
    res.status(500).json({message: "Internal server error"});
  }
};

export const postEmp = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const { name, email, designation, empid } = req.body;

  try {
    const exist = await UserModel.findOne({
      where: { empid }
    });

    if (exist) {
      return res.status(409).json({message: "Employee already exists"});
    }

    const employee = await UserModel.create({name,email, designation, empid});
    res.status(201).json(employee);

  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error"});
  }
};

export const putEmp = async (req, res) => {
  const empid = req.params.empid;

  try {
    const [updated] = await UserModel.update(req.body,{ where: { empid }});
    if (updated === 0) {
      return res.status(404).json({message: "Employee not found"});
    }
    return res.json({message: "Update successfully"});

  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error"});
  }
};

export const deleteEmp = async (req, res) => {
  const empid = req.params.empid;
  try {
    const emp = await UserModel.findOne({where: { empid }});

    if (!emp) {
      return res.status(404).json({message: "Employee not found"});
    }
    await emp.destroy();

    res.json({message: "Deleted successfully"});
    
  } catch (error) {
    res.status(500).json({ message: "Internal server error"});
  }
};