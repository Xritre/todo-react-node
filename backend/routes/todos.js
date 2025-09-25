var express = require("express");
var router = express.Router();
const multer = require("multer");
const upload = multer(); // for parsing multipart/form-data
var { TodoModel } = require("../model/Todo");

router.get("/", async function (req, res) {
  const todos = await TodoModel.find();
  console.log("todos", todos);
  const plainTodos = todos.map((todo) => todo.toObject());
  res.send({ result: plainTodos });
});

router.post("/", upload.none(), async function (req, res, next) {
  try {
    const body = req.body;
    console.log("body from frontend", body);
    const todo = new TodoModel({
      task: body.task,
      status: body.status,
      dueDate: body.dueDate,
    });
    console.log("mock todo model from backend", todo);
    await todo.save();
    res.send({ result: "Create todo success" });
  } catch (error) {
    next(error);
  }
});

router.put("/", upload.none(), async function (req, res, next) {
  try {
    const body = req.body;
    const id = body.id;
    const filter = { _id: id };
    const replaceTodo = await TodoModel.findByIdAndUpdate(
      filter,
      {
        task: body.task,
        status: body.status,
        dueDate: body.dueDate,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!replaceTodo) {
      return res.status(404).send({ message: `Todo with id ${id} not found` });
    }
    res.send({
      message: "Successfully updated",
      result: replaceTodo.toObject(),
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    const params = req.params;
    const id = params.id;
    console.log("id to delete from params", id);
    const deleteTodo = await TodoModel.findByIdAndDelete(id);
    if (!deleteTodo) {
      return res.status(404).send({ message: `Todo with ${id} not found` });
    }
    res.send({ message: "Successfully deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
