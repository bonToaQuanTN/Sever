import express from "express";
import { getAll, postApi, putApi } from "../controller/userController.js";


const router=express.Router();
router.get("/employees",getAll);
router.post("/employees",postApi);
router.put("/employees/:empid",putApi);

export default router;