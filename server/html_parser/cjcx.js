var cheerio = require('cheerio');

module.exports = function(data) {
    var $ = cheerio.load(data);
    var mark = $('#dataList');
    var result = [];

    mark.find('tr').eq(0).nextAll(function(item){
        var list = $(this);
        var term = list.find('td').eq(1).text();
        var subject = list.find('td').eq(3).text();
        var score = list.find('td').eq(4).text();
        var credit = list.find('td').eq(5).text();
        var type = list.find('td').eq(9).text()


        var requestData = {term:term, subject:subject, score:score, credit:credit, type:type};
        result.push(requestData);
    })

    return result;
}


