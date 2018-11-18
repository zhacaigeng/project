<?php
$infozhang = $_POST['code'];
class A{
    public $name = 'zhang';
    public $age = json_decode($infozhang);
};
$info = new A();

echo json_encode($info);



?>