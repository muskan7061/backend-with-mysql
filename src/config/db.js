const { Sequelize } = require("sequelize")

const  sequelize = new Sequelize(
    "users",
    "root",
    "",
    {
        host: 'localhost',
        dialect: 'mysql'
      }
    
)

sequelize.authenticate()
.then(() => console.log("Database connected"))
.catch((err) => console.log("failed to connect ", err))


module.exports = sequelize