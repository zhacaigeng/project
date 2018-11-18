var db = require('./db.js')
// 获取全部的学生信息获取全部的学生信息
module.exports.students = function (req, res) {
    db.findAll('students', function (err, docs) {
        if (err) {
            throw err
        }
        //返回json数据
        res.json({
            status: 0,
            list: docs
        })

    })
}


module.exports.info = (req, res) => {

    var objectId = db.objectId(req.query._id);
    db.findOne('students', objectId, (err, docs) => {
        if (err) {
            throw errerrerr
        }
        res.json({
            status: 0,
            stuinfo: docs
        });
    })
}
module.exports.cities = function (req, res) {
    db.findAll('cities', function (err, docs) {
        if (err) {
            throw err
        }
        res.json({
            cities: docs
        })
    })
}
module.exports.majors = function (req, res) {
    db.findAll('majors',function (err, docs) {
        if (err) {
            throw err
        }
        res.json({
            majors: docs
        })
    })
}

module.exports.addStudentOne = function (req, res) {
    console.log(req.body);
    var model = {
        sno: req.body.sno,
        sname: req.body.sname,
        sgender: req.body.sgender.toLowerCase() === 'f' ? '女' : '男',
        sbirthday: req.body.sbirthday,
        sphone: req.body.sphone,
        saddr: req.body.saddr,
        smajor: req.body.smajor
    }
    // console.log(model);


    db.insertOne('students', model, function (err, result) {
        if (err) {
            res.json({
                status: err.code,
                result: result
            });
        } else {
            res.json({
                status: 0,
                result: result
            });
        }

    })
}

module.exports.editStudentOne = function (req, res) {
    
    var objectId = db.objectId(req.body._idEdit);
    var model = {
        sno: req.body.sno,
        sname: req.body.sname,
        sgender: req.body.sgender.toLowerCase()=== "m" ? '男' : '女',
        sbirthday: req.body.sbirthday,
        sphone: req.body.sphone,
        saddr: req.body.saddr,
        smajor: req.body.smajor
    }
    // console.log(model);
    
    db.updateOne('students', {
        _id: objectId
    }, model, function (err, result) {
        if(err){
            throw err
        }
        res.json(result)
    })
}

module.exports.deleteOne = function (req, res) {
    // 
    var objid = db.objectId(req.query._id)
    console.log(objid);
    
    db.deleteOne("students", {
        _id: objid
    }, function (err, result) {
        res.json(result)
    })
}
