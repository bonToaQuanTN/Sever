import express from 'express';
import { connection } from './controller/postgres.js';
import {errorHandler} from './Middleware/errorMiddleware.js'
import router from './view/routers.js';
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();

const app = express();

console.log(process.env.JWT_SECRET);
app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandler);

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`server running port ${PORT}`);
});

connection();