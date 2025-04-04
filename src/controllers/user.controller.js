const bcrypt = require("bcrypt")
const User = require("../models/user.model")
// const {Op}  = require("sequelize")

const userRegister = async  (req, res) =>{
    try {
        const {name, username, email, age, password} = req.body
        if([name, username, email, age, password].some((data) => data.trim() === ""))
        {
            return res.status(409).json({
                status: 409,
                messgae: "All fileds are required to be submit form"
            })
        }
        // check existing user
        const existingUser = await User.findOne({where: {email}
        });

        if (existingUser) {
            return res.status(409).json({
                status: 409,
                message: "User already exists with this email or username"
            });
        }

        // hash password
        const hassPassword = await bcrypt.hash(password, 10)
        // create user 
        const user = await User.create({ name, username, email, age, password: hassPassword });
        return res.status(201).json({
            status: 201,
            data: user,
            message: "User create successfully"
        })
    } catch (error) {
        console.log("Error in userRegister Api:", error);
        return res.status(500).json({
            status: 500,
            message: "internal server error",
            error: error.message
        })
    }
}

module.exports = userRegister