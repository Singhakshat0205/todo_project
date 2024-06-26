const express= require('express');
const router= express.Router();
const todoController= require('../controller/todo');

router
    .get("/", todoController.getAllTodos)
    .get("/:id",todoController.getTodo)
    .post("/",todoController.AddTodo)
    .put("/:id",todoController.replaceTodo)
    .patch("/:id",todoController.updateTodo)
    .delete("/:id",todoController.removeTodo)


exports.router=router;