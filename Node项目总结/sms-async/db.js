var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
var config = require('./config.js');

function connect(callback){
    mongoClient.connect(config.mongoUrl,function(err, db){
        if(err){
            throw err
        }
        callback(db)
        
    })
};

//3 查询所有特定集合所有数据
module.exports.findAll = function (claName, callback) {
    connect(function(db){
        db.collection(claName).find({}).toArray(function(err, docs){
            callback(err, docs);
        })
        
        db.close()
    })
}

//根据某个学号  查看某个学员的信息
module.exports.findOne = function (claName, studId, callback) {
    connect(function(db){
        db.collection(claName).findOne({_id:studId},function(err, doc){
            callback(err, doc);
        })
        
        db.close()
    })
}


//转换objectid
module.exports.objectId = function (objectIdStr) {
    var ObjectId = mongo.ObjectID;
    return new ObjectId(objectIdStr);
}

// insert插入方法
module.exports.insertOne = function (calname, data, callback) {
    // 连接数据库
    connect(function(db){
        db.collection(calname).insertOne(data, function(err, result) {
            db.close();
            callback(err, result)
        })
    })
}
module.exports.updateOne = function (calname, filiters, datas, callback) {
   connect(function(db){
       db.collection(calname).updateOne(filiters, datas, function(err, result) {
           callback(err, result);
           db.close()
       })
   })
}

module.exports.deleteOne = function (calname, filiters, callback) {
    connect(function(db){
        db.collection(calname).deleteOne(filiters, function(err, result){
            callback(err, result)
        })
    })
}