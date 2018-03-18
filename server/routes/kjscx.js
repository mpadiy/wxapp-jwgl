var express = require('express');
var router = express.Router();
var login = require('../login/login');
var kjscx = require('../html_parser/kjscx');
var superagent = require('superagent');

router.post('/', function(req, res, next) {
    var jxlbh=req.body['jxlbh']; //教学楼编号 0/1/3/5/7/11/13/14/15/S1/TY
    var xq=req.body['xq']; //星期 1~7
    var zc=req.body['zc']; //周次 1~30
    var jc=req.body['jc']; //节次 01/03/05/07/09
    var key=req.body['key'];
    login(key,function (err,cookies) {
        if(err){
            res.send({code:0,msg:'登录失败'});
        }
        else{
            superagent.post('http://jwgl.sdust.edu.cn/jsxsd/kbxx/jsjy_query2')
                .set('Accept','text/html,application/xhtml+xml,application/xml;q=0.9,*!/!*;q=0.8')
                .set('Accept-Encoding', 'gzip, deflate')
                .set('Cache-Control','max-age=0')
                .set('Accept-Language', 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2')
                .set('Connection', 'keep-alive')
                .set('Content-Type','application/x-www-form-urlencoded')
                .set('Cookie', cookies)
                .set('Host','jwgl.sdust.edu.cn')
                .set('Referer', 'http://jwgl.sdust.edu.cn/jsxsd/kbxx/jsjy_query')
                .set('Upgrade-Insecure-Requests','1')
                .set('User-Agent','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0')
                .send({
                    typewhere:'jszq',
                    xnxqh:'2017-2018-2',
                    xqbh:'1',
                    jxqbh:'',
                    jxlbh:jxlbh,
                    jsbh:'',
                    bjfh:'=',
                    rnrs:'',
                    jszt:'',
                    zc:zc,
                    zc2:zc,
                    xq:xq,
                    xq2:xq,
                    jc:jc,
                    jc2:jc
        })
                .end(function(err, response){
                    if (err || !response.ok) {
                        res.send({code:-1,msg:'获取空教室失败'});
                        res.end();
                    } else {
                        var html=response.text;
                        var result=kjscx(html);
                        res.send({code:1,res:result});
                        res.end();
                    }
                });
        }
    })
});
module.exports = router;