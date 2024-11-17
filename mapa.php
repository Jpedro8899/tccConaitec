<?php
session_start();
    print_r($_SESSION);

    if(!(isset($_SESSION['login'])))
    {
        unset($_SESSION['login']);
        header("Location: login.php");
     
    }
    $logado = $_SESSION['login'];





    

// Carregar o arquivo JSON
$jsonFile = 'pontos.json';
$jsonData = file_get_contents($jsonFile);
$data = json_decode($jsonData, true);

// Verificar se a solicitação é POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Receber os dados enviados via POST
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['coords'], $input['location'], $input['quality'])) {
      //   Adicionar o novo ponto ao array existente
        $data['points'][] = $input;

    // Salvar o array atualizado no arquivo JSON
       if (file_put_contents($jsonFile, json_encode($data, JSON_PRETTY_PRINT))) {
            echo "Ponto adicionado com sucesso!";
       } else {
           http_response_code(500);
           echo "Erro ao salvar o ponto.";
      }
    } else {
       http_response_code(400);
       echo "Dados inválidos.";
    }
}


// Carregar o arquivo JSON
$jsonFile = 'pontos.json';
$jsonData = file_get_contents($jsonFile);
$data = json_decode($jsonData, true);

// Verificar se a solicitação é DELETE
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Receber os dados enviados via DELETE
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['coords']) && is_array($input['coords'])) {
        // Procurar e remover o ponto com as coordenadas fornecidas
        foreach ($data['points'] as $key => $point) {
            if ($point['coords'] === $input['coords']) {
                unset($data['points'][$key]); // Remove o ponto
                $data['points'] = array_values($data['points']); // Reindexa o array
                break;
            }
        }

        // Salvar o array atualizado no arquivo JSON
        if (file_put_contents($jsonFile, json_encode($data, JSON_PRETTY_PRINT))) {
            echo "Ponto excluído com sucesso!";
        } else {
            http_response_code(500);
            echo "Erro ao salvar o arquivo JSON.";
        }
    } else {
        http_response_code(400);
        echo "Dados inválidos.";
    }
}



// Carregar o arquivo JSON
$jsonFile = 'pontos.json';
$jsonData = file_get_contents($jsonFile);
$data = json_decode($jsonData, true);

// Verificar se a solicitação é PUT
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Receber os dados enviados via PUT
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['coords']) && isset($input['newData']) && is_array($input['newData'])) {
        // Procurar o ponto com as coordenadas fornecidas
        foreach ($data['points'] as $key => $point) {
            if ($point['coords'] === $input['coords']) {
                // Atualizar o ponto com os novos dados
                $data['points'][$key] = array_merge($point, $input['newData']);
                break;
            }
        }

        // Salvar o array atualizado no arquivo JSON
        if (file_put_contents($jsonFile, json_encode($data, JSON_PRETTY_PRINT))) {
            echo "Ponto atualizado com sucesso!";
        } else {
            http_response_code(500);
            echo "Erro ao salvar o arquivo JSON.";
        }
    } else {
        http_response_code(400);
        echo "Dados inválidos.";
    }
}








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
