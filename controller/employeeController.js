import { validationResult } from "express-validator";

export const createEmployee = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const employee = await Employee.create(req.body);

  res.json(employee);
};