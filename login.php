<?php
session_start();
include 'db_connection.php';

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT id, password FROM users WHERE username = ?";
    if($stmt = $conn->prepare($sql)){
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $stmt->store_result();

        if($stmt->num_rows == 1){
            $stmt-> bind_param($id, $hashed_password);
            $stmt->fetch();
            
            if(password_verify($password, $hashed_password)){
                $_SESSION['loggedin'] = true;
                $_SESSION['id'] = $id;
                $_SESSION['username'] = $username;

                header("location: welcome.php");
        }else{
            echo "Senha incorreta.";
        }
    }else{
        echo "Usuário não encontrado com esse nome.";
    }
    $stmt->close();
}
}
$conn->close();
?>