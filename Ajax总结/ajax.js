var $ = {
    ajax:function (obj) {
        var type = obj.type||'get';
        var url = obj.url ||location.href;
        var callback = obj.callback;
        var data = this.setParam(obj.data);

// 请求服务器

        var xhr = new XMLHttpRequest();
        if(type == 'get'){
            url = url+'?'+data;
            data = null;
        }

        xhr.open(type,url);
        if(type == 'post'){
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

        }
        xhr.send(data);


        // 监听服务器的相应
        xhr.onreadystatechange = function name(params) {
            if(xhr.readyState ==4 && xhr.status == 200){
                var r = xhr.response;
                r = JSON.parse(r);
                callback&&callback(r);
            }
        }
    },
    setParam:function (data) {
        if(typeof data == 'object'){
            var s = '';
            for (var key in data){
                s+=key+'='+data[key]+'&';
            }
            // 去掉最后一个&
            s = s.slice(0,s.length-1);
            return s
        }
    }
};
