const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  status: { type: String, required: true },
  dueDate: { type: Date, required: true },
});

todoSchema.set("toObject", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const TodoModel = new mongoose.model("Todo", todoSchema);

module.exports = { TodoModel };
