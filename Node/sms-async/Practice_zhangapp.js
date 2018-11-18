var express = require('express');
var app = express();
var path = require('path')
var bodyParser = require('body-parser')



app.use(express.static(path.join(__dirname,'views')))

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


app.use('/',function  (req, res) {
    res.json({
        title:'zhang'
    })
})
app.listen(8080,function  (arguments) {
    console.log('8080开启了');
})