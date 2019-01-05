var express = require('express');
var router = express.Router();
const db = require("ykt-mongo");
const client = require("ykt-http-client");
client.url("localhost:8080");

//查询所有
router.get("/",async function(req,res){
    let {page,rows,type,value} = req.query;
    let option = {};
    if(type && value){
        option = {[type]:value}
    }
    // db.collection("students").findByPage(page,rows,option,function(data){
    //     res.send(data);
    // });
    let data = await client.get("/students",{page,rows,...option});
    res.send(data);
});

//根据ID查询学生
router.get("/:id",async function(req,res){
    let id = req.params.id;
    // db.collection("students").find({_id:db.ObjectID(id)},function(data){
    //     res.send(data[0]);
    // });
    let data = await client.get("/students/"+id);
    res.send(data);
});

//增加学生
router.post("/",async function(req,res){
    let {name,age,gender,headImg} = req.body;
    // db.collection("students").insert({name,age,gender,headImg},function(data){
    //     res.send(data);
    // });
    let data = await client.post("/students",{name,age,gender,headImg});
    res.send(data);
});

//修改学生
router.put("/:id",async function(req,res){
    let {name,age,gender} = req.body;
    let id = req.params.id;
    // db.collection("students").update({_id:db.ObjectID(id)},{name,age,gender},function(data){
    //     res.send(data);
    // });
    let data = await client.put("/students/"+id,{name,age,gender});
    res.send(data);
});

//删除学生
router.delete("/:id",async function(req,res){
    let id = req.params.id;
    // db.collection("students").remove({_id:db.ObjectID(id)},function(data){
    //     res.send(data);
    // });
    let data = await client.delete("/students/"+id);
    res.send(data);
});



module.exports = router;