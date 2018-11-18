var mongodb = require('mongodb');
var db = require('./db.js')

//请求页
module.exports.index = function (req, res) {
    //读取数据库的新闻信息
    db.findAll('news', {}, function (err, doc) {
        if (err) {
            throw err
        }
        res.render('index', {
            pageTitle: '我是习近平',
            list: doc
        })
    })
    // var MongodbClient = mongodb.MongoClient;
    // var connStr = 'mongodb://127.0.0.1:27017/test';
    // MongodbClient.connect(connStr, function (err, db) {
    //     db.collection('news').find({}).toArray(function (err, doc) {

    //         db.close();
    //         res.render('index', {
    //             pageTitle: '我是习近平',
    //             list: doc
    //         })
    //     })
    // })



    // res.render('index',{})
};
//详情页面
module.exports.details = function (req, res) {
    db.findOne('news', {
        id: parseInt(req.query.id)
    }, function (err, doc) {
        if (err) {
            throw err
        }
        if (doc) {
            res.render('details', {
                title: doc.title,
                text: doc.text
            })
        } else {
            res.send('<h1>No Such Item</h1>')

        }


    })
    // var MongodbClient = mongodb.MongoClient;
    // var connStr = 'mongodb://127.0.0.1:27017/test';
    // MongodbClient.connect(connStr, function (err, db) {
    //     db.collection('news').findOne({
    //         id: parseInt(req.query.id)
    //     }, function (err, doc) {
    //         db.close();
    //         if (doc) {
    //             res.render('details', {
    //                 title: doc.title,
    //                 text: doc.text
    //             })
    //         } else {
    //             res.send("<h1>No Such Item</h1>")
    //         }

    //     })
    // })
};
//提交页面
module.exports.submit = function (req, res) {
    res.render('submit', "");
};
module.exports.addGet = function (req, res) {
    req.query.id = parseInt(req.query.id)
    db.insertOne('news',req.query,function(err,result) {
        
        if(err){
            throw err
        }
        res.redirect('/');
    })

    // MongodbClient.connect(connStr, function (err, db) {
    //     db.collection('news').insertOne(req.query, function (err, result) {
    //         if (err) {
    //             throw err
    //         }
    //         db.close();
    //         // console.log(JSON.stringify(result));
    //         // res.send('ok')
    //         res.redirect('/');
    //     })
    // })

};

module.exports.addPost = function (req, res) {
    req.body.id = parseInt(req.body.id);
    db.insertOne('news',req.body,function(err, result) {
        if(err){
            throw err
        }
        res.redirect('/');
    })
};
