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
        designation:{
            type: DataTypes.STRING,
            allowNull:false
        },
        empid:{
            type: DataTypes.STRING,
            allowNull:false,
            unique:true
        }
    });

    return User;
}