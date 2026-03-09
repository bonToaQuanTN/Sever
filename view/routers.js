import express from "express";
import { getAll, postEmp, getId, putEmp, deleteEmp} from "../controller/userController.js";
import { employeeValidation } from "../validators/employeeValidator.js";
import { delay } from "../Middleware/delay.js"

const router = express.Router();

router.use(delay);

router.get("/employees", getAll);
router.get("/employees/:empid", getId);
router.post( "/employees", employeeValidation, postEmp);
router.put( "/employees/:empid",  employeeValidation, putEmp);
router.delete( "/employees/:empid", deleteEmp);

export default router;