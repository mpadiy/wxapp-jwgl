var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var config = require('./config');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var login = require('./routes/login');
var cjcx = require('./routes/cjcx');
var kbcx = require('./routes/kbcx');
var kjscx = require('./routes/kjscx');

app.use('/api/login', login);
app.use('/api/cjcx', cjcx);
app.use('/api/kbcx', kbcx);
app.use('/api/kjscx', kjscx);

app.listen(config.port);
console.log(`listening on port ${config.port}`);