// Import packages
require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var mongoose = require("mongoose");

const MONGODB_URL = process.env.MONGODB_URL;

// Import routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var todosRouter = require("./routes/todos");

var app = express();

var corsOption = {
  origin: ["http://localhost:5173"],
};

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
// Parse data in JSON and URL-encoded format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Parse formData

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors(corsOption));

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/todos", todosRouter);

// Connect to mongoDB
mongoose
  .connect(`${MONGODB_URL}/mydb`)
  .then((value) => {
    console.log("Connect MongoDB Succuessfully");
  })
  .catch((error) => {
    console.error(`Failed to connect MongoDB due to : ${error}`);
  });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
