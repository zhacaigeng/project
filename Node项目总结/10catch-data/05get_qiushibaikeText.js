var http = require('http');
var fs = require('fs');
var _ = require('underscore');
var https = require('https');
var cheerio = require('cheerio');

function connectQiushibaike(callback){
    var options = {
        hostname: 'www.qiushibaike.com',
        port: 443,
        path: '/text/',
        method: 'GET',
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Host': 'www.qiushibaike.com',
            'If-None-Match': "6750f6576145a370672124d5bacaf0aa47ae461c",
            'Referer': 'https://www.qiushibaike.com/',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
        }
    }
    
    var req = https.request(options, function (res) {
        var arr = [];
        res.on('data', function (chunk) {
            arr.push(chunk);
            // console.log(arr, typeof arr);
        });
        res.on('end', function () {
            var buffer = Buffer.concat(arr);
            // console.log(buffer, typeof buffer);
            var infoHtml = buffer.toString('utf8');
            console.log(infoHtml, typeof infoHtml);
    
            // 开始写入
            fs.writeFile('./zdb.text', infoHtml, function (err, result) {
                if (err) {
                    throw err;
                };
                console.log('写入ok');
            })
            // jquyer
            var $ = cheerio.load(infoHtml);
            var infoObj = [];
            $('div.article.block.untagged.mb15').each(function (idx, ele) {
                var Obj = {
                    author: $(ele).find('h2').text(),
                    content: $(ele).find('.content>span').text(),
                };
                infoObj.push(Obj);

            // console.log('8888' + infoObj);
            });
            callback(infoObj);
            
        })
    })
    req.on('error', function (err) {
        // console.log(err);
    
    })
    req.end();
}

var server = http.createServer(function(req, res) {
    // console.log(req.url);
    var reqUrl = req.url.toLowerCase();
            //localhost:8080/index
    if(reqUrl == '/index'){
        //开始请求
        connectQiushibaike(function(infoObj){
            fs.readFile('./index.html','utf8',function(err, data){
                var tem = _.template(data);
                var tearr = infoObj;
                var newhtml = tem({tearr:tearr});
                res.end(newhtml);
                
            })
        })
        
    }
    
})
server.listen(8082, function(){
    console.log('i am 8080 i am ok');
})
