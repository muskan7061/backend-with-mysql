const Todo = require("../models/todo.model")
const addTodo = async (req, res) =>{
    try {
        const {title, addTodo} = req.body
        if(!title && !addTodo){
            return res.status(409).json({
                status: 409,
                message: "addTodo and title are required"
              }); 
        }
        const existTodo = await Todo.findOne({where: {title}})
        if(existTodo){
            return res.status(409).json({
                status: 409,
                message: "This title already exist"
              });
        }
        const createTodo = await Todo.create({addTodo, title})
        return res.status(201).json({
            status: 201,
            data: createTodo,
            message: "Todo created successfully",
          });
    } catch (error) {
        console.log("Error in addTodo Api:", error);
        return res.status(500).json({
          status: 500,
          message: "internal server error",
          error: error.message,
        });
    }
}
const updateTodo = async (req, res) => {
    try {
        const { id } = req.params; 
        const { title, addTodo } = req.body; 
        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).json({
                status: 404,
                message: "Todo not found",
            });
        }
        await todo.update({ title, addTodo });

        return res.status(200).json({
            status: 200,
            message: "Todo updated successfully",
            data: todo,
        });
    } catch (error) {
        console.error("Error in updateTodo API:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message,
        });
    }
};
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).json({
                status: 404,
                message: "Todo not found",
            });
        }
        await todo.destroy();
        return res.status(200).json({
            status: 200,
            message: "Todo deleted successfully",
        });
    } catch (error) {
        console.error("Error in deleteTodo API:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message,
        });
    }
};

const deleteTodoAll = async (req, res) => {
    try {
        await Todo.destroy({ where: {}, truncate: true });
        return res.status(200).json({
            status: 200,
            message: "All Todos deleted successfully",
        });
    } catch (error) {
        console.error("Error in deleteTodoAll API:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message,
        });
    }
};

const getOne = async (req, res) =>{
    try {
        const {id} = req.params
        const findOne = await Todo.findByPk(id)
        if (!findOne) {
            return res.status(404).json({
                status: 404,
                message: "Todo not found",
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Todo fetched successfully",
            user: findOne
        });
    } catch (error) {
        console.error("Error in getOne API:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message,
        });
    }
}
const getAll = async (req, res) =>{
    try {
        const findAll = await Todo.findAll()
        if (!findAll) {
            return res.status(404).json({
                status: 404,
                message: "Todos not found",
            });
        }
        return res.status(200).json({
            status: 200,
            message: "fetched all todos successfully",
            user: findAll
        });
    } catch (error) {
        console.error("Error in getOne API:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message,
        });
    }
}


module.exports = {addTodo, updateTodo, deleteTodo, deleteTodoAll, getOne, getAll}