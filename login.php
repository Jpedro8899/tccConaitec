

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="login2.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" 
    integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==" 
    crossorigin="anonymous" 
    referrerpolicy="no-referrer">

    <title>Login</title>
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
            <img src="Maizar(1).gif">
        </div>
        <div class="content-box">
            <div class="form-box">
                <h1></h1>
                <h2>Login</h2>
                <form action= "testLogin.php" method="POST" >
                    <div class = "input-box">
                    <span>Email</span>
                    <input type="text" name="login" id="login" placeholder="Insira seu email" id="email">
                    </div>

                    <div  class = "input-box">
                    <span>Senha</span>
                    <input type="password" name="senha" id="senha" placeholder="senha" id="senha">
                    </div>

                    <div class="remember">
                        <label>
                            <input type="checkbox"> lembre que sou eu
                        </label>
                    </div>
                        <section>
                    <input type="submit" class="submitButton">
                    </section>
                    <div class="input-box">
                        <p>Não tem uma conta? <a href="formulario.php">Cadastre-se</a></p>
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

    
        
    <button>
        <i class="fa-solid fa-bars fa-2x"></i>
    </button>
    
</body>
</html> 