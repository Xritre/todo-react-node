var express = require("express");
var router = express.Router();
const multer = require("multer");
const upload = multer(); // for parsing multipart/form-data
var { TodoModel } = require("../model/todo");

router.get("/", async function (req, res) {
  const todos = await TodoModel.find();
  console.log("todos", todos);
  res.send({ result: todos });
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

module.exports = router;
