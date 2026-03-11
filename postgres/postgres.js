import { Sequelize } from 'sequelize';
import { createUserModel } from '../model/userData.js';

const sequelize = new Sequelize('crud_db', 'postgres', 'MinWan', {
  host: 'localhost',
  port: 6969,
  dialect: 'postgres'
});

let UserModel = null;

const connection = async () => {
  try {
    // test connection
    await sequelize.authenticate();
    console.log("Database connected successfully");

    // create model
    UserModel = await createUserModel(sequelize);
    sequelize.sync({alter:true})

    // sync database
    await sequelize.sync();
    console.log("Database synced");
  }catch (error){
    console.error("Database connection failed:", error);
  }
};

export {
  connection,
  sequelize,
  UserModel
};