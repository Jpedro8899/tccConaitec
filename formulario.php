<?php

if($_SERVER['REQUEST_METHOD'] == 'POST'){
include "config.php";

$login = $_POST['login'];
$senha = $_POST['senha'];
$nome = $_POST['nome'];
$data = $_POST['data'];
$telefone = $_POST['telefone'];
$cpf = $_POST['cpf'];


$result = mysqli_query($conexao, "INSERT INTO usuarios (login, senha, nome, data, telefone, cpf) 
VALUES('$login', '$senha','$nome', '$data', '$telefone', '$cpf')");


}
//if($_SERVER['REQUEST_METHOD'] == 'POST')
//{
//    echo($_POST['login']);
 //   echo "<br>";
 //   echo($_POST['senha']);
  //  die();
//}

?>


<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="formulario.css">
    <title>Cadastro</title>
    <style>
        section{
           display: flex;
           justify-content: center;
        
        }
         .submitButton{
        appearance: button;
        padding: 5px 10px;
        background-color:  rgb(6, 157, 199);
        border: none;
        color: white;
        text-decoration: none;
        border-radius : 2px;
         }
         .content-box .form-box .input-box span{
    font-size: 16px;
    margin-bottom: 5px;
    display: inline-block;
    color: black;
    font-weight: 400;
}
        div.input-box{

        }

       
    </style>
</head>
<body>
    <div class = "container-login">
        <div class = "img-box">
            <img src="Maizar.gif">
        </div>
        <div class="content-box">
            <div class="form-box">
                <h2>Cadastro</h2>
                <form  method="POST" >


                <div class = "input-box">
                <label for="nome">Nome completo</label>
                    <input type="text" name="nome" id="nome" placeholder="Nome completo">
                    </div>

                    <div class = "input-box">
                    <label for="login">Email</label>
                    <input type="text" name="login" id="login" placeholder="Email">
                    </div>

                    <div class = "input-box">
                   <label for="data">Data de nascimento</label>
                    <input type="date" name="data" id="data" >
                    </div>

                    <div class = "input-box">
                    <label for="cpf">CPF</label>
                    <input type="text" name="cpf" id="cpf">
                    </div>

                    <div class = "input-box">
                    <label for="telefone">Telefone</label>
                    <input type="tel" name="telefone" id="telefone" placeholder="(00) 00000-0000" >
                    </div>

                    <div  class = "input-box">
                    <label for="senha">Senha</label>
                    <input type="password" name="senha" id="senha"placeholder="Crie sua senha">
                    </div>

                    <div  class = "input-box">
                    <label for="confira">Confirmar senha</label>
                    <input type="password" name="confirma" id="confirma"placeholder="Confirme sua senha">
                    </div>

                    <div class="remember">
                        <label>
                            <input type="checkbox"> Lembre de mim
                        </label>
                       
                    </div>
                    <section>
                       <a href="login.php" class="submitButton">Cadastrar</a>
                    </section>
                    <div class="input-box">
                        <p>Já tem uma conta? <a href="login.php">Entre com uma conta já existente</a></p>
                    </div>
                </form>
                <h3 class="h3">Entrar com</h3>
                <ul class = "ul">
                    <li><img src="facebook.png"></li>
                    <li><img src="google.png"></li>
                    <li><img src="apple.png"></li>
                </ul>

                <div>
                    <footer></footer>
                </div>

            </div>
        </div>
    </div>
    <script>

    </script>
   
        
</body>
</html>