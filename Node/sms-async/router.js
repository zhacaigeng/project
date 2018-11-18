var express = require('express');
var path = require('path');
var router = express.Router();
var handler = require('./handler.js')

//静态托管把student.html 托管抛出去
router.use(express.static(path.join(__dirname,'views')))


// 挂在路由详情列表信息路由
router.get('/list', handler.students);

//单个学生详情的信息
router.get('/info', handler.info);

//返回所有城市信息
router.get('/cities', handler.cities);

//返回所有专业信息
router.get('/majors', handler.majors);


router.post('/add',handler.addStudentOne)
router.post('/edit',handler.editStudentOne)
router.get('/delete',handler.deleteOne)






module.exports = router;
