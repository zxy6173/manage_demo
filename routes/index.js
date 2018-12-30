var express = require('express');
var router = express.Router();
const multiparty = require("multiparty");
const path = require("path");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index1', { title: 'Express' });
});

router.get('/getSession',function(req,res){
    res.send(req.session.user || {});
});

router.get('/removeSession',function(req,res){
    req.session.user = null;
    res.send({status:1});
});

router.post("/upload", function(req, res) {
    let form = new multiparty.Form({
        uploadDir: "./public/upload" // 指定保存上传文件的路径
    });
    form.parse(req, function(err, fields, files) {
        let key = Object.keys(files)[0]; // 获取上传信息中的key
        if (err) {
            res.send(err);
        } else {
            res.send(path.basename(files[key][0].path)); // 根据key获取上传的文件名并返回
        }
    });
});

module.exports = router;
