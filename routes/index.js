var express = require('express');
var router = express.Router();

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

module.exports = router;
