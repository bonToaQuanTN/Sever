import { Sequelize } from 'sequelize';
import { createUserModel } from '../model/userData.js';
import bcrypt from "bcrypt";

const sequelize = new Sequelize('crud_db', 'postgres', 'MinWan', {
  host: 'localhost',
  port: 6969,
  dialect: 'postgres'
});

let UserModel = null;

const connection = async () => {
  try {

    await sequelize.authenticate();
    console.log("Database connected successfully");

    // create model
    UserModel = await createUserModel(sequelize);

    // sync database
    await sequelize.sync({ alter: true });
    console.log("Database synced");

    // create admin
    await createAdmin();

  } catch (error){
    console.error("Database connection failed:", error);
  }
};

const createAdmin = async () => {
  const admin = await UserModel.findOne({
    where:{ email:"admin@gmail.com" }
  });

  if(!admin){
    const hash = await bcrypt.hash("toibjngu",10);
    await UserModel.create({
      name:"Admin",
      email:"admin@gmail.com",
      password:hash,
      designation:"Administrator",
      empid:"ADMIN001",
      role:"admin"
    });

    console.log("Admin account created");
  }

};

export {
  connection,
  sequelize,
  UserModel
};