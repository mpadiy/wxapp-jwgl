var cheerio = require('cheerio');
module.exports = function (data) {
  var result = [];
  var x = -1;
  var $ = cheerio.load(data);
  var kb = $('#kbtable');
  kb.find('tr').each(function (itemClass) {
    var y = 0;
    x++;
    var whichClass = $(this);
    whichClass.find('td').each(function (itemDay) {
      y++;
      var eachProject = $(this).find('div').last();
      if (eachProject.find('[title="老师"]').eq(1).text()) {
        //console.log(eachProject.find('[title="老师"]').eq(1).text());
        var teacher1 = eachProject.find('[title="老师"]').eq(0).text();
        var teacher2 = eachProject.find('[title="老师"]').eq(1).text();

        var week1 = eachProject.find('[title="周次(节次)"]').eq(0).text();
        var week2 = eachProject.find('[title="周次(节次)"]').eq(1).text();

        var classRoom1 = eachProject.find('[title="教室"]').eq(0).text();
        var classRoom2 = eachProject.find('[title="教室"]').eq(1).text();

        eachProject.children().each(function (it) {
          $(this).remove();
        });
        var project = eachProject.text();
        var projects = project.split("---------------------");

        var requestData1 = {
          subject: projects[0],
          teacher: teacher1,
          week: week1,
          classroom: classRoom1,
          x: x,
          y: y
        };
        var requestData2 = {
          subject: projects[1],
          teacher: teacher2,
          week: week2,
          classroom:
          classRoom2,
          x: x,
          y: y
        };
        result.push(requestData1);
        result.push(requestData2);

      }
      else {

        var teacher = eachProject.find('[title="老师"]').text();
        var week = eachProject.find('[title="周次(节次)"]').text();
        var classRoom = eachProject.find('[title="教室"]').text();
        eachProject.children().each(function (it) {
          $(this).remove();
        });
        var project = eachProject.text();

        var requestData = { subject: project, teacher: teacher, week: week, classroom: classRoom, x: x, y: y };
        result.push(requestData);


      }

    })

  });
  result.pop();
  var note = kb.find('tr').last().find('td').text().trim();
  result.push({ note: note });
  return result;

};






