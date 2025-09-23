const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  id: String,
  task: { type: String, required: true },
  status: { type: String, required: true },
  dueDate: { type: Date, required: true },
});

const TodoModel = new mongoose.model("Todo", todoSchema);

module.exports = { TodoModel };
