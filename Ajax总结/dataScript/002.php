<?php
$infozhang = $_POST['code'];
class A{
    public $name = 'zhang';
    public $age = 19;
};
$info = new A();

echo json_encode($info);



?>