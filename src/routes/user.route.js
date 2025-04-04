
const express = require("express");
const userRegister = require("../controllers/user.controller");

const router = express.Router();

router.post("/signup", userRegister);

module.exports = router;
