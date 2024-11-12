// Inicializando o mapa
var map = L.map('map').setView([-27.05, -49.57], 12);

// Adicionando o tile layer (camada de mapa)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Função para carregar pontos do arquivo JSON
function loadPoints() {
    fetch('pontos.json')
        .then(response => response.json())
        .then(data => {
            var points = data.points;
            points.forEach(function(point) {
                var marker = L.marker(point.coords).addTo(map);
                marker.bindPopup(
                    `<b>${point.location}</b><br>` +
                    `Qualidade do ar: ${point.quality}<br>` +
                    `CO2: ${point.co2}<br>` +
                    `Temperatura: ${point.temperature}<br>` +
                    `Humidade: ${point.humidity}<br>` +
                    `Óxido de enxofre (SO2): ${point.so2}<br>` +
                    `Óxidos de nitrogênio (NOx): ${point.nox}`
                );
            });
        })
        .catch(error => console.error('Erro ao carregar pontos:', error));
}

// Carregar os pontos de medição
loadPoints();










// Inicializando o mapa
var map = L.map('map').setView([-27.05, -49.57], 12);

// Adicionando o tile layer (camada de mapa)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Função para carregar pontos do arquivo JSON
function loadPoints() {
    fetch('pontos.json')  // Nome do arquivo JSON
        .then(response => response.json())
        .then(data => {
            var points = data.points;
            points.forEach(function(point) {
                var marker = L.marker(point.coords).addTo(map);
                marker.bindPopup(
                    `<b>${point.location}</b><br>` +
                    `Qualidade do ar: ${point.quality}<br>` +
                    `CO2: ${point.co2}<br>` +
                    `Temperatura: ${point.temperature}<br>` +
                    `Humidade: ${point.humidity}<br>` +
                    `Óxido de enxofre (SO2): ${point.so2}<br>` +
                    `Óxidos de nitrogênio (NOx): ${point.nox}`
                );
            });
        })
        .catch(error => console.error('Erro ao carregar pontos:', error));
}

// Carregar os pontos de medição do JSON
loadPoints();

// Variável para controlar o modo de adição de ponto
let addPointMode = false;

// Referência ao botão de adicionar ponto
const addPointBtn = document.getElementById('add-point-btn');

// Evento de clique no botão para ativar o modo de adição de ponto
addPointBtn.addEventListener('click', () => {
    addPointMode = !addPointMode;
    addPointBtn.textContent = addPointMode ? 'Clique no Mapa para Adicionar Ponto' : 'Adicionar Ponto';
});

// Evento de clique no mapa para adicionar um novo ponto
map.on('click', function (e) {
    if (addPointMode) {
        // Captura as coordenadas do ponto clicado
        const coords = e.latlng;

        // Desativa o modo de adição de ponto após a captura das coordenadas
        addPointMode = false;
        addPointBtn.textContent = 'Adicionar Ponto';

        // Exibe um formulário de entrada de dados para o ponto
        const location = prompt("Digite o nome do local:");
        const quality = prompt("Qualidade do ar:");
        const co2 = prompt("CO2:");
        const temperature = prompt("Temperatura:");
        const humidity = prompt("Humidade:");
        const so2 = prompt("Óxido de enxofre (SO2):");
        const nox = prompt("Óxidos de nitrogênio (NOx):");

        if (location && quality && co2 && temperature && humidity && so2 && nox) {
            // Cria o marcador com as informações fornecidas
            const marker = L.marker([coords.lat, coords.lng]).addTo(map);
            marker.bindPopup(
                `<b>${location}</b><br>` +
                `Qualidade do ar: ${quality}<br>` +
                `CO2: ${co2}<br>` +
                `Temperatura: ${temperature}<br>` +
                `Humidade: ${humidity}<br>` +
                `Óxido de enxofre (SO2): ${so2}<br>` +
                `Óxidos de nitrogênio (NOx): ${nox}`
            ).openPopup();

            // (Opcional) Salvar o ponto em um backend ou localStorage
            // Exemplo: enviar as coordenadas e dados para o backend usando fetch
            // fetch('/salvar_ponto.php', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         coords: [coords.lat, coords.lng],
            //         location, quality, co2, temperature, humidity, so2, nox
            //     })
            // });
        } else {
            alert("Por favor, preencha todas as informações.");
        }
    }
});

