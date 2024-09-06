<?php
session_start();

if(!isset($_SESSION['loggendin']) $_SESSION['loggendin'] !== true){
    header("location: login.html");
    exit;

}
echo"Bem-vindo, " . $_SESSION['username'] . "!";
?>
<a href="logout.php">Logoff</a>

