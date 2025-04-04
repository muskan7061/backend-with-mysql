const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const User = require("../models/user.model");
// const {Op}  = require("sequelize")

const userRegister = async (req, res) => {
  try {
    const { name, username, email, age, password } = req.body;
    if (
      [name, username, email, age, password].some((data) => data.trim() === "")
    ) {
      return res.status(409).json({
        status: 409,
        messgae: "All fileds are required to be submit form",
      });
    }
    // check existing user
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({
        status: 409,
        message: "User already exists with this email or username",
      });
    }

    // hash password
    const hassPassword = await bcrypt.hash(password, 10);
    // create user
    const user = await User.create({
      name,
      username,
      email,
      age,
      password: hassPassword,
    });
    return res.status(201).json({
      status: 201,
      data: user,
      message: "User create successfully",
    });
  } catch (error) {
    console.log("Error in userRegister Api:", error);
    return res.status(500).json({
      status: 500,
      message: "internal server error",
      error: error.message,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    // console.log("Headers:", req.headers);
    // console.log("Request Body:", req.body);
    const { email, password } = req.body;

    console.log(email, password);

    if (!email && !password) {
      return res.status(409).json({
        status: 409,
        messgae: "Email and Password are required",
      });
    }
    const findUser = await User.findOne({ where: { email } });
    if (!findUser) {
      return res.status(409).json({
        status: 409,
        messgae: "User does not exist with this Email",
      });
    }
    // console.log(findUser);
    const isMatch = await bcrypt.compare(password, findUser.password);
    // console.log(isMatch);

    if (!isMatch) {
      return res.status(401).json({
        status: 401,
        message: "Invalid Credentials",
      });
    }
    const token = jwt.sign(
        {
          userId: findUser.id,
          name: findUser.name,
          username: findUser.username,
          email: findUser.email,
          age: findUser.age
        },
        "gfrgebfv",
        { 
          expiresIn: "1h"
        }
      );
    console.log("Token", token);
    
    return res.status(201).json({
      status: 201,
      message: "User Login successfully",
      token,
      user: {
        id: findUser.id,
        email: findUser.email,
      },
    });
  } catch (error) {
    console.log("Error in userLogin Api:", error);
    return res.status(500).json({
      status: 500,
      message: "internal server error",
      error: error.message,
    });
  }
};

module.exports = { userRegister, userLogin };
