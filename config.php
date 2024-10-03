<?php
    $dbhost = 'localhost';
    $dbUsername = 'root';
    $dbPassword = 'root';
    $dbName = 'formulario-jp';

    $conexao = new mysqli($dbhost, $dbUsername, $dbPassword, $dbName);

   // if($conexao->connect_error){
    //    echo"Erro";
   // }
    //else{
   //     echo "Conectado ao Banco de Dados";
   // }
?>