<?php
$num1 = intval($_POST['num1'])?? 0;
$num2 = intval( $_POST['num2']) ?? 0;

$suma =$num1 + $num2;
echo $suma;