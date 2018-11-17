var express = require('express');
var router = express.Router();
const db = require("ykt-mongo");

//查询所有
router.get("/",function(req,res){
    let {page,rows} = req.query;
    db.collection("students").findByPage(page,rows,{},function(data){
        res.send(data);
    });
});

//根据ID查询学生
router.get("/:id",function(req,res){
    let id = req.params.id;
    db.collection("students").find({_id:db.ObjectID(id)},function(data){
        res.send(data[0]);
    });
});

//增加学生
router.post("/",function(req,res){
    let {name,age,gender} = req.body;
    db.collection("students").insert({name,age,gender},function(data){
        res.send(data);
    });
});

//修改学生
router.put("/:id",function(req,res){
    let {name,age,gender} = req.body;
    let id = req.params.id;
    db.collection("students").update({_id:db.ObjectID(id)},{name,age,gender},function(data){
        res.send(data);
    });
});

//删除学生
router.delete("/:id",function(req,res){
    let id = req.params.id;
    db.collection("students").remove({_id:db.ObjectID(id)},function(data){
        res.send(data);
    });
});



module.exports = router;