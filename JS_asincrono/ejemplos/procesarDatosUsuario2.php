<?php
$nombre = $_POST['txtNombre'] ?? "";
$email = $_POST['txtEmail'] ?? "";
$edad = $_POST['txtEdad'] ?? "";

//llamar a la base de datos y guardar la info
if ($nombre==""|| $email==""||$edad=="") {
   $mensaje ="Todos los campos son obligatorios";
   $resp=[
    "status" => false,
    "message" => $mensaje
    ];
}else{
$mensaje = "Usted se llama $nombre, y su email es $email y su edad es $edad";
if ($edad>=18) {
    $mensaje .= "y es mayor de edad";
}else {
    $mensaje .= "y es menor de edad";
}
$resp=[
    "status" => true,
    "message" => $mensaje
    ];
}
header("Content-Type: aplication/json");
$respJson= json_encode($resp);
echo $respJson;
