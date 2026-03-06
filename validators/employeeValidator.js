import { body } from "express-validator";

export const employeeValidation = [
    body("name")
    .notEmpty()
    .withMessage("Name required"),
    body("email")
    .isEmail()
    .withMessage("Invalid email format"),
    body("empid")
    .notEmpty()
    .withMessage("id requied")
]