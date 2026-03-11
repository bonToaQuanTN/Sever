import {DataTypes, Sequelize} from 'sequelize';

export const createUserModel=async (Sequelize)=>{
    const User=Sequelize.define('User',{
        name:{
            type: DataTypes.STRING,
            allowNull:false
        },
        email:{
            type: DataTypes.STRING,
            allowNull:false,
            lowercase:true,
            unique:true,
            validate:{
                isEmail:true
            }
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false
        },
        designation:{
            type: DataTypes.STRING,
            allowNull:false
        },
        empid:{
            type: DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        role:{
            type: DataTypes.ENUM("admin","user"),
            defaultValue:"user"
        }
    });
    return User;
}