const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser")
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const clientsRouter = require("./routes/clients");
const positionsRouter = require("./routes/positions");
const billsRouter = require("./routes/bills");

require("dotenv").config();
const config = require("./config/config");
console.log(config.MONGODB_URL_DEV);

var app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/client", clientsRouter);
app.use("/position", positionsRouter);
app.use("/bill", billsRouter);


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

mongoose.connect(config.MONGODB_URL_DEV);
const db = mongoose.connection
db.on('error', (err) => {
  console.log(err)
})

db.once('open', () => {
  console.log("success")
})

module.exports = app;
