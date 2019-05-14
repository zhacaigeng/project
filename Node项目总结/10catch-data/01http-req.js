var https = require('https');


var options = {
    hostname: 'www.qiushibaike.com',
    port: 443,
    path: '/',
    method: 'get',
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


//调用requset方法
var req = https.request(options, function (res) {
    //通过res对象获取服务器相应的数据
})
req.on('error', function (err) {
    console.log(err);

})
req.end()