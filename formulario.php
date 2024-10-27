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
    <link rel="stylesheet" href="formulario2.css">
    <title>nog do grau</title>
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
                    <span>Nome completo</span>
                    <input type="text" name="nome" id="nome" placeholder="Nome completo">
                    </div>

                    <div class = "input-box">
                    <span>Email</span>
                    <input type="text" name="login" id="login" placeholder="Email">
                    </div>

                    <div class = "input-box">
                    <span>Data de nascimento</span>
                    <input type="date" name="data" id="data" >
                    </div>

                    <div class = "input-box">
                    <span>CPF</span>
                    <input type="text" name="cpf" id="cpf">
                    </div>

                    <div class = "input-box">
                    <span>Telefone</span>
                    <input type="tel" name="telefone" id="telefone" placeholder="(00) 00000-0000" >
                    </div>

                    <div  class = "input-box">
                    <span>Senha</span>
                    <input type="password" name="senha" id="senha"placeholder="Crie sua senha">
                    </div>

                    <div  class = "input-box">
                    <span>Confirmar senha</span>
                    <input type="password" name="confirma" id="senha"placeholder="Confirme sua senha">
                    </div>

                    <div class="remember">
                        <label>
                            <input type="checkbox"> Lembre de mim
                        </label>
                       
                    </div>
                    <section>
                        <input class= "submitButton" type="submit" value="Cadastrar"/>
                    </section>
                    <div class="input-box">
                        <p>Já tem uma conta? <a href="login.html">Entre com uma conta já existente</a></p>
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
        if(value.data === undefined){
            alert("Preencha a data de nascimento");
            return false;
        }
    </script>
   
        
</body>
</html>