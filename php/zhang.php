<?php
    


// 创建php对象
class A{
    public $id ='123';
    public $name = 'zhangdongbin';

}
$zhang = new A();
// $zhang->id = '111';
$wang = json_encode($zhang);
echo $wang;

?>