var https = require('https');
var cheerio = require('cheerio');
var fs = require('fs');



var options = {
    hostname: 'www.qiushibaike.com',
    port: 443,
    path: '/',
    method: 'GET',
    headers: {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Pragma": "no-cache",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
    }
}


//调用request方法
// var req = https.request(options, function (res) {
//     var arr = [];
//     res.on('data',function(chunk) {
//         arr.push(chunk);
//     });
//     //监控数据码流状态
//     res.on('end',function() {
//         var buffer = Buffer.concat(arr);
//         var htmlInfo = buffer.toString('utf8');
//         var $ = cheerio.load(htmlInfo);
//         var infomation = [];
//         // 数据扒拉扒拉扒拉扒拉扒拉扒拉扒拉扒拉
//         $("div.article.block.untagged.mb15").each(function(idx,ele) {
//             var Obj = {
//                 author:$(ele).find('h2').text(),
//                 content:$(ele).find('.content>span').text()
//             }
//             infomation.push(Obj);

//         })
//         // 数据存储json
//         fs.writeFile('./zhangdongbin.json',JSON.stringify(infomation),function(err) {
//             if(err){
//                 throw err;
//             }
//             console.log('ok');

//         })
//     })
// })

var req = https.request(options, function (res) {
    var arr = [];
    res.on('data', function (chunk) {
        arr.push(chunk);
    });
    res.on('end', function () {
        var buffer = Buffer.concat(arr);
        var infoHtml = buffer.toString('utf8');

        // jquyer
        var $ = cheerio.load(infoHtml);
        var infoObj = [];
        $('div.article.block.untagged.mb15').each(function (idx, ele) {
            var Obj = {
                author: $(ele).find('h2').text(),
                content: $(ele).find('.content>span').text(),
            };
            infoObj.push(Obj);
        });
        // 开始写入
        fs.writeFile('./zhangdongbin.json', JSON.stringify(infoObj), function (err, result) {
            if (err) {
                throw err;
            };
            console.log('ok');
        })
    })
})
req.on('error', function (err) {
    console.log(err);

})
req.end()