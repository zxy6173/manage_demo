var express = require("express");
var router = express.Router();
const db = require("ykt-mongo");
const client = require("ykt-http-client");
client.url("localhost:8080");
//验证手机号是否存在
router.get("/", async function(req, res) {
    let phone = req.query.phone;
    // db.collection("users").find({phone},function(data){
    //     if(data.length > 0){
    //         res.send({
    //             status:0
    //         });
    //     }else{
    //         res.send({
    //             status:1
    //         });
    //     }
    // });
    let data = await client.get("/users", { phone });
    if (data.length > 0) {
        res.send({
            status: 0
        });
    } else {
        res.send({
            status: 1
        });
    }
});

//登录
router.post("/login", async function(req, res) {
    let { phone, pwd } = req.body;
    // db.collection("users").find({ phone, pwd }, function(data) {
    //     if (data.length > 0) {
    //         req.session.user = data[0];
    //         res.send({
    //             status: 1
    //         });
    //     } else {
    //         res.send({
    //             status: 0
    //         });
    //     }
    // });
    let data = await client.post("/login", { phone, pwd });
    if (data.phone) {
        req.session.user = data;
        res.send({
            status: 1
        });
    } else {
        res.send({
            status: 0
        });
    }
});

//注册
router.post("/", function(req, res) {
    let { phone, pwd } = req.body;
    // db.collection("users").insert({ phone, pwd }, function(data) {
    //     res.send(data);
    // });
    let data = client.post("/users",{phone,pwd});
    res.send(data);
});

module.exports = router;
