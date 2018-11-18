<?php
header('Content-Type:text/xml;charset=utf-8');  //告诉浏览器返回的数据当做XML来处理
//请求过来后，获取数据 返回给前端

$data=file_get_contents('003.xml'); //获取指定文件的内容

echo $data; //返回给前端



?>