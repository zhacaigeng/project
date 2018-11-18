var mongodb = require('mongodb');
var config = require('./config.js');

function connectdb(callback) {
    var mongoClient = mongodb.MongoClient;
    mongoClient.connect(config.conStr, function (err, db) {
        if (err) {
            throw err
        }
        callback(db);
    })
}

//查询所有数据
module.exports.findAll = function (colname, filter, callback) {
    connectdb(function (db) {
        console.log('我们成功了')
        db.collection(colname).find(filter).toArray(function (err, doc) {
            db.close();
            callback(err, doc);
        })
    })
}

//查询单条数据
module.exports.findOne = function (colname, filter, callback) {
    connectdb(function (db) {
        console.log('我们成功了')
        db.collection(colname).findOne(filter, function (err, docs) {
            db.close();
            callback(err, docs);
        })
    })
}
//插入单条数据
module.exports.insertOne = function (colname, doc, callback) {
    connectdb(function(db){
        db.collection(colname).insertOne(doc,function(err,result){
            db.close();
            callback(err,result);
        })
    })
}
//删除某条数据

module.exports.deleteOne = function (colname,filter,callback) {
    connectdb(function(db){
        db.collection(colname).deleteOne(filter,function(err,result){
            db.close();
            callback(err,result);
        })
    })
}

module.exports.updateOne = function (colname,filter,data,callback) {
    connectdb(function(db){
        db.collection(colname).updateOne(filter,data,function(err,result){
            db.close();
            callback(err,result);
        })
    })
}