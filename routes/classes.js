var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("localhost:8080");

//查询所有
router.get("/",async function(req,res){
    let {page,rows,type,value} = req.query;
    let option = {};
    if(type && value){
        option = {[type]:value}
    }
    let data = await client.get("/classes",{page,rows,...option});
    res.send(data);
});

//根据ID查询班级
router.get("/:id",async function(req,res){
    let id = req.params.id;
    let data = await client.get("/classes/"+id);
    res.send(data);
});

//增加班级
router.post("/",async function(req,res){
    let {name,date} = req.body;
    let data = await client.post("/classes",{name,date});
    res.send(data);
});

//修改班级
router.put("/:id",async function(req,res){
    let {name,date} = req.body;
    let id = req.params.id;
    let data = await client.put("/classes/"+id,{name,date});
    res.send(data);
});

//删除学生
router.delete("/:id",async function(req,res){
    let id = req.params.id;
    let data = await client.delete("/classes/"+id);
    res.send(data);
});



module.exports = router;