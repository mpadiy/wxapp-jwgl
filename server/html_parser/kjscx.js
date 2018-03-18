/*
superagent.post('http://jwgl.sdust.edu.cn/jsxsd/kbxx/jsjy_query2')
    .set('Accept','text/html,application/xhtml+xml,application/xml;q=0.9,*!/!*;q=0.8')
    .set('Accept-Encoding', 'gzip, deflate')
    .set('Accept-Language', 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2')
    .set('Connection', 'keep-alive')
    .set('Content-Length','116')
    .set('Content-Type','application/x-www-form-urlencoded')
    .set('Cookie', 'JSESSIONID=84DF861F5543C24E07D77B3EB7984ED2')
    .set('Host','jwgl.sdust.edu.cn')
    .set('Referer', 'http://jwgl.sdust.edu.cn/jsxsd/kbxx/jsjy_query')
    .set('Upgrade-Insecure-Requests','1')
    .set('User-Agent','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0')
POST参数
{
    typewhere:'jszq',
    xnxqh:'2017-2018-2', 学期
    xqbh:'1',  校区编号
    jxqbh:'',
    jxlbh:'7', 教学楼编号
    jsbh:'',
    bjfh:'=',
    rnrs:'',
    jszt:'',
    zc:'1', 周次
    zc2:'1',周次
    xq:'1', 星期
    xq2:'1',星期
    jc:'01',节次
    jc2:'01'节次
}*/
var cheerio = require('cheerio');
module.exports=function (data) {
    var result=[];
    var $=cheerio.load(data);
    var allClassroom=$('tr').eq(0).nextAll(function(){
        var eachClassroom=$(this);
        var classroomName=eachClassroom.find('td').first().text().trim();
        var isEmpty=eachClassroom.find('td').last().text();
        if(!isEmpty){
            result.push(classroomName);
        }

    });
    return result;


};
