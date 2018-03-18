var superagent = require('superagent');
var captcha = require('./captcha');
var nameParser = require('../html_parser/name');
function login(encoded,callback) {
    superagent.get('http://jwgl.sdust.edu.cn/jsxsd/verifycode.servlet')
        .set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8')
        .set('Accept-Encoding', 'gzip, deflate')
        .set('Accept-Language', 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2')
        .set('Cache-Control', 'max-age=0')
        .set('Connection', 'keep-alive')
        .set('Host', 'jwgl.sdust.edu.cn')
        .set('Upgrade-Insecure-Requests', '1')
        .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0')
        .end(function (err, data) {
            if (err) {
                callback('强智系统繁忙');
            }
            else {
                var cookies = data.header['set-cookie'];
                var imgBuffer = data.body;
                captcha(imgBuffer, function (err,cap) {
                    if(err){
                        callback('验证码识别错误');
                    }
                    else{
                        superagent.post('http://jwgl.sdust.edu.cn/jsxsd/xk/LoginToXk')
                            .set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,*!/!*;q=0.8')
                            .set('Accept-Encoding', 'gzip, deflate')
                            .set('Accept-Language', 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2')
                            .set('Connection', 'keep-alive')
                            .set('Content-Type', 'application/x-www-form-urlencoded')
                            .set('Cookie', cookies[0])
                            .set('Host', 'jwgl.sdust.edu.cn')
                            .set('Referer', 'http://jwgl.sdust.edu.cn/jsxsd/xk/LoginToXk')
                            .set('Upgrade-Insecure-Requests', '1')
                            .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0')
                            .send({encoded: encoded, RANDOMCODE: cap})
                            .end(function (err, response) {
                                if (err || !response.ok) {
                                    callback('登录失败，请重试');
                                } else {
                                    if(response.charset==='GBK'){
                                        callback('登录失败，请重试');
                                    }
                                    else{
                                        var name = nameParser(response.text);
                                        callback(null,name);
                                    }
                                }
                            })
                    }
                })
            }
        })
}

module.exports=login;