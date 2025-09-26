const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  status: { type: String, required: true },
  dueDate: { type: Date, required: true },
});

// Remove _id, __v fields and add id field when called toJSON()
// toJSON was called when res.json() and res.send()
todoSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const TodoModel = new mongoose.model("Todo", todoSchema);

module.exports = { TodoModel };
