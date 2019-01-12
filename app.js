var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var studentsRouter = require("./routes/students");
const expressJWT = require("express-jwt");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//配置验证token的接口
app.use(
    expressJWT({
        secret: "hello jwt",
        getToken: function(req) {
            if (
                req.headers.authorization &&
                req.headers.authorization.split(" ")[0] === "Bearer"
            ) {
                return req.headers.authorization.split(" ")[1];
            } else if (req.query && req.query.token) {
                return req.query.token;
            }
            return null;
        }
    }).unless({
        path: ["/users/login", "/users", "/favicon.ico"]
    })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/students", studentsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    //如果是token验证失败，执行以下代码
    if (err.name == "UnauthorizedError") {
        res.status(401).send("invalid token...");
        return;
    }
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    if (err.status != 404) {
        console.error(err);
    }

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
