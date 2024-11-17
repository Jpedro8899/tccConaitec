// Inicializando o mapa
var map = L.map('map').setView([-27.05, -49.57], 12);

// Adicionando o tile layer (camada de mapa)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Variável para controlar o modo de adicionar ponto
let addingPoint = false;

// Evento para ativar o modo de adicionar ponto
document.getElementById('add-point-btn').addEventListener('click', function () {
    addingPoint = true; // Ativar o modo de adicionar ponto
    alert('Clique no mapa para adicionar um ponto.');
});

// Evento para capturar clique no mapa
map.on('click', function (e) {
    if (!addingPoint) {
        return; // Só funciona se o modo de adicionar estiver ativo
    }

    // Capturar as coordenadas
    var coords = e.latlng;
    var latitude = coords.lat;
    var longitude = coords.lng;

    // Criar formulário dinamicamente
    var formHTML = `
        <div id="form-popup" style="position: absolute; top: 10%; left: 10%; background: white; padding: 10px; border: 1px solid #ccc; z-index: 1000;">
            <h3>Adicionar Local</h3>
            <form id="location-form">
                <label for="location-name">Nome do Local:</label><br>
                <input type="text" id="location-name" name="location-name" required><br><br>
                
                <label for="air-quality">Qualidade do Ar:</label><br>
                <input type="text" id="air-quality" name="air-quality" required><br><br>
                
                <button type="button" id="submit-button">Salvar</button>
            </form>
        </div>
    `;

    // Remover formulário antigo, se existir
    var oldForm = document.getElementById('form-popup');
    if (oldForm) {
        oldForm.remove();
    }

    // Adicionar formulário na página
    document.body.insertAdjacentHTML('beforeend', formHTML);

    // Evento para salvar os dados
    document.getElementById('submit-button').addEventListener('click', function () {
        var name = document.getElementById('location-name').value;
        var airQuality = document.getElementById('air-quality').value;

        if (name && airQuality) {
            // Adicionar o marcador no mapa com popup
            L.marker([latitude, longitude]).addTo(map)
                .bindPopup(`<b>${name}</b><br>Qualidade do Ar: ${airQuality}`)
                .openPopup();

            alert('Ponto adicionado com sucesso!');

            // Aqui você pode enviar os dados para o backend via AJAX ou fetch API, se necessário
            
            // Remover o formulário após salvar
            document.getElementById('form-popup').remove();
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    // Desativar o modo de adicionar ponto após capturar o clique
    addingPoint = false;
});


// Função para carregar pontos do arquivo JSON
fetch('pontos.json')
    .then(response => response.json())
    .then(data => {
        data.points.forEach(point => {
            // Adiciona um marcador no mapa para cada ponto
            L.marker(point.coords).addTo(map)
                .bindPopup(`
                    <b>${point.location}</b><br>
                    Qualidade do Ar: ${point.quality}<br>
                    CO2: ${point.co2}<br>
                    Temperatura: ${point.temperature}<br>
                    Umidade: ${point.humidity}<br>
                    SO2: ${point.so2}<br>
                    NOx: ${point.nox}
                `);
        });
    })
    .catch(error => console.error('Erro ao carregar pontos:', error));