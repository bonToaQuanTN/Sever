import express from "express";
import { getAll, postEmp, getId, putEmp, deleteEmp, login} from "../controller/userController.js";
import { employeeValidation } from "../validators/employeeValidator.js";
import { auth } from "../Middleware/authMiddleware.js"
import {adminOnly} from "../Middleware/roleMiddleware.js"

const router = express.Router();

router.post("/login",login);

router.get("/employees",auth, getAll);

router.get("/employees/:empid", auth, getId);

router.post( "/employees", employeeValidation, auth, adminOnly, postEmp);

router.put( "/employees/:empid",  employeeValidation, auth, adminOnly, putEmp);

router.delete( "/employees/:empid", auth, adminOnly, deleteEmp);

export default router;