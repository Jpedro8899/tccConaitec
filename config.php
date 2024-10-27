<?php
    $dbhost = 'localhost';
    $dbUsername = 'root';
    $dbPassword = 'root';
    $dbName = 'formulario-jp';
    $data = $_POST['data'];

    $conexao = new mysqli($dbhost, $dbUsername, $dbPassword, $dbName);

   if($conexao->connect_error){
       echo"Erro";
    }
   else{
        echo "Conectado ao Banco de Dados";
   }
   if($data == false){
    echo "Preencha todos os campos!";
}

?>