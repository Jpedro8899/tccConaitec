<?php
    $dbhost = 'Localhost';
    $dbUsername = 'root';
    $dbPassword = 'root';
    $dbName = 'form-maizar';

    $conexao = new mysqli_connect($dbhost, $dbUsername, $dbPassword, $dbUsername);

    if($conexao->conect_errno){
        echo"Erro";
    }
    else{
        echo "Conectado ao Banco de Dados";
    }
?>