<?php
session_start();
    print_r($_SESSION);

    if(!(isset($_SESSION['login'])))
    {
        unset($_SESSION['login']);
        header("Location: login.php");
     
    }
    $logado = $_SESSION['login'];
?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin=""></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="mapa.css">
    <title>Monitoramento da Qualidade do Ar</title>

<style>
    body{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: rgb(168, 158, 158) ;
    }

    #map{
        width: 100%;
        height: 500px;
        border: 1px solid #ccc; 
        margin-bottom: 20px;  
     

    }
   


</style>
</head>


<body>
<button id="add-point-btn" style="width: 200px;  position: absolute;
    top: 650px;
    left: 120px;
    padding: 10px 15px;
    background-color: #244979;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
    z-index: 1000;  border-radius: 5px; animation">Adicionar Ponto</button>
    



<!--adicionar formulario-->






    
    <div id="map"></div>

    <nav class="menu-lateral">
        <div class="btn-expandir">
            <i class="bi bi-clouds-fill" id="btn-expandir"></i>
            <ul>
                <li class="menuzinho ativo">
                    <a href="mapa.php">
                        <span class="icon"><i class="bi bi-broadcast-pin"></i></span>
                        <p class="text">Monitoramento</p>
                        <span class="txt-link"></span>
                    </a>
                </li>
                <li class="menuzinho">
                    <a href="dados.html">
                        <span class="icon"><i class="bi bi-clipboard2-pulse-fill"></i></span>
                        <p class="text">Dados</p>
                        <span class="txt-link"></span>
                    </a>
                </li>
                <li class="menuzinho">
                    <a href="grafico.html">
                        <span class="icon"><i class="bi bi-file-earmark-medical"></i></span>
                        <p class="text">Previsão</p>
                        <span class="txt-link"></span>
                    </a>
                </li>
                <li class="menuzinho">
                    <a href="parallax.html">
                        <span class="icon"><i class="bi bi-door-closed-fill"></i>
                        <p class="text">Sair</p>
                        <span class="txt-link"></span>
                    </a>
                </li>
            </ul>
        </div>
    </nav>
    
    <script src="mapa.js"></script>
    <script></script>
</body>
</html>
