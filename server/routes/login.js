var express = require('express');
var router = express.Router();
var login = require('../login/login_name');
router.post('/', function(req, res, next) {
    var key=req.body.key;
    login(key,function (err,data) {
        if(err){
            res.send({code:0,msg:'登录失败'});
        }
        else{
          res.send({ code: 1, res: { name: data[0], id: data[1] } });
        }
        res.end();
    })
});
module.exports = router;