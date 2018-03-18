var cheerio = require('cheerio');
module.exports = function (data) {
    var $ = cheerio.load(data);
    var name = $('#Top1_divLoginName').text();
    var studentName = name.split('(');
    var id = studentName[1].slice(0, -1);
    return [studentName[0], id];
}