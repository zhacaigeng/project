
var config = require('./config.js')
var path  = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var route = require('./route.js');

//做一下准备工作
//1配置模板引擎
app.set('views',path.join(__dirname,'views'));
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'html')
//2配置body-parse

//把用户提交过来的数据解析成查询字符串username=bob&age=18&usergender=kaka
app.use('/',bodyParser.urlencoded({
    extended: false
}))

//把查询字符串解析成json对象
app.use('/', bodyParser.json())
//3各种路由操作
// route(app);
app.use(route)




//启动
app.listen(config.port,function(){
    // console.log('9997start');
    
})