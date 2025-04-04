const dotenv = require("dotenv")
const express = require("express")
const sequelize = require("./config/db")
const userRouter = require("./routes/user.route")
const todoRouter = require("./routes/todo.route")
dotenv.config({path: "./.env"})

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
// Debug Middleware
app.use((req, res, next) => {
    console.log("Middleware Running");
    next();
});


app.use("/api/v1/users", userRouter)
app.use("/api/v1/users", todoRouter)
// sync 
sequelize.sync().then(() =>{
    console.log("Database synced");
    app.listen(process.env.PORT , () => {
        console.log("App is listing on", process.env.PORT);
        
    })
    
})