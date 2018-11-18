var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config.js');
var router = require('./router.js')

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(router);


//创建监听
app.listen(config.port,function() {
    console.log('9090开启了');
    
})