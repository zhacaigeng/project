var express = require('express');
var path = require('path');
var route = express.Router();
var handler = require('./handler.js');


route.get('/',handler.index);
route.get('/submit',handler.submit);
route.get('/details',handler.details);
route.get('/add',handler.addGet);
route.post('/add',handler.addPost);


route.use('/resources', express.static(path.join(__dirname,'resources')));

module.exports = route;
