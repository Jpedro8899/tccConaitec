<?php
session_start();

//print_r($_REQUEST);
if(!empty($_POST['login']) && !empty($_POST['senha']))
{
//acessa o sistema

    include_once('config.php');
    $login = $_POST['login'];
    $senha = $_POST['senha'];



    //echo('Email: ' . $login);
    //echo('<br>');
    //echo('Senha: '   . $senha);

    $sql = "SELECT * FROM usuarios WHERE login = '$login' and senha = '$senha'";

    $result = $conexao->query($sql);

    if(mysqli_num_rows($result)<1)
    {
        unset($_SESSION['login']);

        print("<script>alert('Usuário ou senha incorretos'); window.location='login.php';</script>");
       // header("Location: login.php");
    } else{
       
        $_SESSION['login'] = $login;
        header("Location:mapa.php");
    }

}

?>