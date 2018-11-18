<?php
    

    // 将json格式转换为php对象

    // php关联数组
// $info = array(
//     'name'=>$data->name,
//     'age'=>$data->age,
//     'sex'=>$data->sex
// );


// $info = json_encode($info);
// echo $info;

    
    // header('Content-Type:text/json;charset=utf-8');

    $data = file_get_contents('zhang.json');
    echo $data;

   
   

?>