import express from "express";
import { getAll, postEmp,getId , putEmp, deleteEmp } from "../controller/userController.js";


const router=express.Router();
router.get("/employees",getAll);
router.post("/employees",postEmp);
router.get("/employees/:empid",getId);
router.put("/employees/:empid",putEmp);
router.delete("/employees/:empid",deleteEmp)


export default router;