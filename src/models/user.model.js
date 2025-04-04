const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
  },
  {
    sequelize,
    modelName: "User",
  }
);
module.exports = User
console.log(User === sequelize.models.User);
