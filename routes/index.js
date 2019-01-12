var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
/* GET home page. */
router.get("/", function(req, res, next) {
    res.render("index1", { title: "Express" });
});
//解析token中的内容
router.get("/getToken", function(req, res, next) {
    let token = req.query.token;
    let obj = jwt.decode(token, {
        secret: "hello jwt"
    });
    res.send(obj);
});
module.exports = router;
