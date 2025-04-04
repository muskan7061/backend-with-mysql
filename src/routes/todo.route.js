const express = require("express")
const todoController = require("../controllers/todo.controller")

const router = express.Router()

router.post("/addtodo", todoController.addTodo)
router.put("/updatetodo/:id", todoController.updateTodo)
router.delete("/deletetodo/:id", todoController.deleteTodo)
router.delete("/deletetodoall", todoController.deleteTodoAll)
router.get("/getone/:id", todoController.getOne)
router.get("/getall", todoController.getAll)
module.exports = router;