(function name(params) {
    // var div = ;
    var div = document.querySelector('div');
    var button = document.querySelector('button');
    
    button.onclick= function name(params) {
        
        // console.log(zhang);
        var xhr = new XMLHttpRequest();
        //post请求方式（加载right）
        xhr.open('get','zhang.php');
        xhr.send(null);

        xhr.onreadystatechange = function name(params) {
            if(xhr.readyState == 4&&xhr.status==200){
                var r = xhr.responseText;
                // console.log(r)
                // json转化为dom对象
                r = JSON.parse(r);
                
                console.log(r);


                // var html = '';
                
                // for (var i = 0; i < r.length; i++) {
                //     html+='<td>';
                //     html+='<tr>name:'+r[i].name +'</td><br>';
                //     html+='<tr>sex:'+r[i].sex +'</td><br>';
                //     html+='<tr>from:'+r[i].from +'</td><br>';
                //     html+='<tr>contary:'+r[i].contary +'</td><br>';
                //     html+='</td>';
                // }
               
                // div.innerHTML = html;
                // console.log(div);
                    
                }
                
            
        }

        
        
    };
    



}())