<?php
include 'db_connection.php';
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password password_hash($_POST['password'], PASSWORD_BCRYPT); //HASH DA SENHA 
    
    $sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    if($stmt = $conn ->prepare($sql)){
        $stmt->bind_param("sss", $username, $email, $password);
        if($stmt->execute()){
            echo"Novo usuário registrado com sucesso.";
        }else{
            echo"Erro ao registrar novo usuário: ". $stmt->error;

        }
        $stmt->close();

        }
    }

$conn->close();

?>