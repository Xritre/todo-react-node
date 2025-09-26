var express = require("express");
var router = express.Router();
const multer = require("multer");
const upload = multer(); // for parsing multipart/form-data
var { TodoModel } = require("../model/Todo");
const mongoose = require("mongoose");

const validateObjectId = (objId) => {
  return mongoose.isValidObjectId(objId);
};

router.get("/", async function (req, res, next) {
  try {
    const todos = await TodoModel.find();
    console.log("todos", todos);
    res.json({ result: todos });
  } catch (error) {
    console.error("Error in Get Todos/", error);
    next(error);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const params = req.params;
    const id = params.id;
    if (!validateObjectId(id)) {
      return res.status(400).json({ message: "Id must be ObjectId type" });
    }
    const todoById = await TodoModel.findById(id);
    if (!todoById) {
      const notFound = `Todo with ${id} is not found`;
      return res.status(404).json({ result: null, message: notFound });
    } else {
      res.json({ result: todoById });
    }
  } catch (error) {
    console.error("Error in Get Todos/:id", error);
    next(error);
  }
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
    res.json({ message: "Create todo successfully" });
  } catch (error) {
    console.error("Error in Post Todos/", error);
    next(error);
  }
});

router.put("/", upload.none(), async function (req, res, next) {
  try {
    const body = req.body;
    const id = body.id;
    if (!validateObjectId(id)) {
      return res.status(400).json({ message: "Id must be ObjectId type" });
    }
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
      return res.status(404).json({ message: `Todo with id ${id} not found` });
    }
    res.send({
      message: "Successfully updated",
      result: replaceTodo.toObject(),
    });
  } catch (error) {
    console.error("Error in Put Todos/", error);
    next(error);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    const params = req.params;
    const id = params.id;
    console.log("id to delete from params", id);
    if (!validateObjectId(id)) {
      return res.status(400).json({ message: "Id must be ObjectId type" });
    }
    const deleteTodo = await TodoModel.findByIdAndDelete(id);
    if (!deleteTodo) {
      return res.status(404).send({ message: `Todo #${id} not found` });
    }
    res.send({ message: "Successfully deleted" });
  } catch (error) {
    console.error("Error in Delete Todos/:id");
    next(error);
  }
});

module.exports = router;
