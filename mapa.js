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
      <div id="form-popup" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.5); z-index: 1000;">
        <h3>Adicionar Local</h3>
        <form id="location-form">
            <div class="form-row">
                <div class="form-item">
                    <label for="location-name">Nome do Local:</label>
                    <input type="text" id="location-name" name="location-name" required>
                </div>
                <div class="form-item">
                    <label for="co2">CO2:</label>
                    <input type="text" id="co2" name="co2">
                </div>
            </div>
            <div class="form-row">
                <div class="form-item">
                    <label for="air-quality">Qualidade do Ar:</label>
                    <input type="text" id="air-quality" name="air-quality" required>
                </div>
                <div class="form-item">
                    <label for="temperature">Temperatura:</label>
                    <input type="text" id="temperature" name="temperature">
                </div>
            </div>
            <div class="form-row">
                <div class="form-item">
                    <label for="humidity">Umidade:</label>
                    <input type="text" id="humidity" name="humidity">
                </div>
                <div class="form-item">
                    <label for="so2">SO₂:</label>
                    <input type="text" id="so2" name="so2">
                </div>
            </div>
            <div class="form-row">
                <div class="form-item">
                    <label for="nox">NOx:</label>
                    <input type="text" id="nox" name="nox">
                </div>
            </div>
            <button type="button" id="submit-button">Salvar</button>
            <button type="button" id="cancel-button">Cancelar</button>
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
            const newPoint = {
                coords: [latitude, longitude],
                location: name,
                quality: airQuality,
                co2: document.getElementById('co2').value || "N/A",
                temperature: document.getElementById('temperature').value || "N/A",
                humidity: document.getElementById('humidity').value || "N/A",
                so2: document.getElementById('so2').value || "N/A",
                nox: document.getElementById('nox').value || "N/A"
            };

            // Enviar dados ao backend
            fetch('mapa.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPoint)
            })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Erro ao salvar o ponto.');
                }
            })
            .then(result => {
                alert(result);
                // Adicionar o marcador ao mapa após confirmação
                L.marker(newPoint.coords).addTo(map)
                    .bindPopup(`<b>${newPoint.location}</b><br>Qualidade do Ar: ${newPoint.quality}`)
                    .openPopup();

                document.getElementById('form-popup').remove();
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Ocorreu um erro ao salvar o ponto.');
            });
        } else {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    });

    // Evento para cancelar o formulário
    document.getElementById('cancel-button').addEventListener('click', function () {
        document.getElementById('form-popup').remove();
        addingPoint = false; // Desativar o modo de adicionar ponto
    });

    // Desativar o modo de adicionar ponto após capturar o clique
    addingPoint = false;
});

// Função para carregar pontos do arquivo JSON
fetch('pontos.json')
    .then(response => response.json())
    .then(data => {
        data.points.forEach(point => {
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




















    