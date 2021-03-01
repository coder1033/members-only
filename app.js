// npm imports
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const session = require("express-session");

// store sessions
const MongoStore = require("connect-mongo")(session);

// local imports
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

// environment variables
require("dotenv").config();

// passport middleware for authentication and cookie
require("./middlewares/passport");

// database connection
const mongoDb = process.env.DB_CONNECTION_STRING;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: db }),
    cookie: { expires: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Access to the current user to all the views
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);

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
