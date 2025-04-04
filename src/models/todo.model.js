const {DataTypes, Model} = require("sequelize")
const sequelize = require('../config/db')

class Todo extends Model {}


Todo.init(
    {
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        addTodo:{
            type: DataTypes.STRING,
            allowNull: false
        },
       
    },
    {
        sequelize,
        modelName: "Todo",
    }
)

module.exports = Todo

console.log(Todo === sequelize.models.Todo);
