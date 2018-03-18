var express = require('express');
var router = express.Router();
var superagent = require('superagent');
var login = require('../login/login');
var cjcx = require('../html_parser/cjcx');

router.post('/', function(req, res, next) {
    var key=req.body.key;
    login(key,function (err,cookies) {
        if(err){
            res.send({code:0,msg:err});
            res.end();
        }
        else{
                superagent.get('http://jwgl.sdust.edu.cn/jsxsd/kscj/cjcx_list')
                .set('Accept','text/html,application/xhtml+xml,application/xml;q=0.9,*!/!*;q=0.8')
                .set('Accept-Encoding', 'gzip, deflate')
                .set('Accept-Language', 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2')
                .set('Connection', 'keep-alive')
                .set('Content-Type','application/x-www-form-urlencoded')
                .set('Cookie', cookies)
                .set('Host','jwgl.sdust.edu.cn')
                .set('Referer', 'http://jwgl.sdust.edu.cn/jsxsd/xk/LoginToXk')
                .set('Upgrade-Insecure-Requests','1')
                .set('User-Agent','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0')
                .end(function(err, response){
                    if (err || !response.ok) {
                        res.send({code:-1,msg:'获取成绩失败'});
                        res.end();
                    } else {
                        var html=response.text;
                        var result=cjcx(html);
                        res.send({code:1,res:result});
                        res.end();

                    }
                });
        }

    })
});
module.exports = router;