import { body } from "express-validator";

export const employeeValidation = [

  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Email must be valid (example: abc@mail.com)"),

  body("designation")
    .notEmpty()
    .withMessage("Designation is required"),

  body("empid")
    .notEmpty()
    .withMessage("Employee ID is required")

];