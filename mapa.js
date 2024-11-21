// Inicializando o mapa
var map = L.map('map').setView([-27.05, -49.57], 12);

// Adicionando o tile layer (camada de mapa)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Variável para controlar o modo de adicionar ponto
let addingPoint = false;

// Botão de adicionar ponto
document.getElementById('add-point-btn').addEventListener('click', function () {
    addingPoint = true;
    alert('Clique no mapa para adicionar um ponto.');
});

// Evento para capturar clique no mapa
map.on('click', function (e) {
    if (!addingPoint) return;

    const coords = e.latlng;
    const latitude = coords.lat;
    const longitude = coords.lng;

    const formHTML = `
    <div id="form-popup" style="
        position: fixed; 
        top: calc(50% - 40px); 
        left: calc(50% - 20px); 
        margin-top: 70px;
        transform: translate(-50%, -50%); 
        background-color: #ffffff; 
        padding: 20px; 
        border-radius: 8px; 
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25); 
        width: calc(100% - 250px); 
        max-width: 600px; /* Aumentando a largura para acomodar as colunas */
        z-index: 1050; 
        box-sizing: border-box; 
        font-family: Arial, sans-serif; 
        color: #333;">
        <h3 style="
            font-size: 20px; 
            font-weight: bold; 
            margin-bottom: 15px; 
            text-align: center; 
            color: #007bff; 
            border-bottom: 2px solid #007bff; 
            padding-bottom: 10px;">
            Adicionar Novo Ponto
        </h3>
        <form id="add-point-form">
            <div style="display: flex; flex-wrap: wrap; gap: 20px;">
                <div style="flex: 1; min-width: 45%;">
                    <label for="location" style="display: block; font-weight: bold; margin-bottom: 5px;">Nome do Local:</label>
                    <input type="text" id="location" name="location" required style="
                        width: 100%; 
                        padding: 10px; 
                        border: 1px solid #ccc; 
                        border-radius: 5px; 
                        box-sizing: border-box;">
                </div>
                <div style="flex: 1; min-width: 45%;">
                    <label for="quality" style="display: block; font-weight: bold; margin-bottom: 5px;">Qualidade do Ar:</label>
                    <input type="text" id="quality" name="quality" required style="
                        width: 100%; 
                        padding: 10px; 
                        border: 1px solid #ccc; 
                        border-radius: 5px; 
                        box-sizing: border-box;">
                </div>
                <div style="flex: 1; min-width: 45%;">
                    <label for="co2" style="display: block; font-weight: bold; margin-bottom: 5px;">CO2 (ppm):</label>
                    <input type="text" id="co2" name="co2" style="
                        width: 100%; 
                        padding: 10px; 
                        border: 1px solid #ccc; 
                        border-radius: 5px; 
                        box-sizing: border-box;">
                </div>
                <div style="flex: 1; min-width: 45%;">
                    <label for="temperature" style="display: block; font-weight: bold; margin-bottom: 5px;">Temperatura (°C):</label>
                    <input type="text" id="temperature" name="temperature" style="
                        width: 100%; 
                        padding: 10px; 
                        border: 1px solid #ccc; 
                        border-radius: 5px; 
                        box-sizing: border-box;">
                </div>
                <div style="flex: 1; min-width: 45%;">
                    <label for="humidity" style="display: block; font-weight: bold; margin-bottom: 5px;">Umidade (%):</label>
                    <input type="text" id="humidity" name="humidity" style="
                        width: 100%; 
                        padding: 10px; 
                        border: 1px solid #ccc; 
                        border-radius: 5px; 
                        box-sizing: border-box;">
                </div>
                <div style="flex: 1; min-width: 45%;">
                    <label for="so2" style="display: block; font-weight: bold; margin-bottom: 5px;">SO₂ (μg/m³):</label>
                    <input type="text" id="so2" name="so2" style="
                        width: 100%; 
                        padding: 10px; 
                        border: 1px solid #ccc; 
                        border-radius: 5px; 
                        box-sizing: border-box;">
                </div>
                <div style="flex: 1; min-width: 45%;">
                    <label for="nox" style="display: block; font-weight: bold; margin-bottom: 5px;">NOx (μg/m³):</label>
                    <input type="text" id="nox" name="nox" style="
                        width: 100%; 
                        padding: 10px; 
                        border: 1px solid #ccc; 
                        border-radius: 5px; 
                        box-sizing: border-box;">
                </div>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 20px;">
                <button type="button" id="save-point" style="
                    background-color: #007bff; 
                    color: white; 
                    padding: 10px 20px; 
                    border: none; 
                    border-radius: 5px; 
                    font-size: 14px; 
                    cursor: pointer; 
                    transition: background-color 0.3s;">
                    Salvar
                </button>
                <button type="button" id="cancel-point" style="
                    background-color: #dc3545; 
                    color: white; 
                    padding: 10px 20px; 
                    border: none; 
                    border-radius: 5px; 
                    font-size: 14px; 
                    cursor: pointer; 
                    transition: background-color 0.3s;">
                    Cancelar
                </button>
            </div>
        </form>
    </div>
`;


    document.body.insertAdjacentHTML('beforeend', formHTML);

    // Salvar o ponto
    document.getElementById('save-point').addEventListener('click', function () {
        const location = document.getElementById('location').value;
        const quality = document.getElementById('quality').value;
        const co2 = document.getElementById('co2').value;
        const temperature = document.getElementById('temperature').value;
        const humidity = document.getElementById('humidity').value;
        const so2 = document.getElementById('so2').value;
        const nox = document.getElementById('nox').value;

        if (location && quality && co2 && temperature && humidity && so2 && nox) {
            const newPoint = {
                coords: [latitude, longitude],
                location,
                quality,
                co2,
                temperature,
                humidity,
                so2,
                nox
            };

            fetch('http://localhost:3000/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPoint)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Ponto adicionado com sucesso!');
                    L.marker(newPoint.coords).addTo(map)
                        .bindPopup(`<b>${newPoint.location}</b><br>Qualidade do Ar: ${newPoint.quality}`);
                    document.getElementById('form-popup').remove();
                } else {
                    alert(`Erro: ${data.message}`);
                }
            })
            .catch(error => console.error('Erro ao adicionar ponto:', error));
        }
    });

    // Cancelar
    document.getElementById('cancel-point').addEventListener('click', function () {
        document.getElementById('form-popup').remove();
    });

    addingPoint = false;
});

// Carregar pontos
fetch('http://localhost:3000/pontos')
    .then(response => response.json())
    .then(data => {
        console.log('Pontos carregados:', data);
        data.points.forEach(point => {
            const marker = L.marker(point.coords).addTo(map);
            const popupContent = `
                <b>${point.location}</b><br>
                Qualidade do Ar: ${point.quality}<br>
                CO2: ${point.co2}<br>
                Temperatura: ${point.temperature}<br>
                Umidade: ${point.humidity}<br>
                SO2: ${point.so2}<br>
                NOx: ${point.nox} <br>
                <div class="botao">
                    <button class="delete-point" style="background-color: red; color: white; border-radius: 4px; cursor: pointer;">Excluir</button>
                    <button class="edit-point" style="background-color: green; color: white; border-radius: 4px; cursor: pointer;">Editar</button>
                </div>
            `;
            marker.bindPopup(popupContent);

            // Excluir ponto
            marker.on('popupopen', function () {
                const deleteButton = document.querySelector('.delete-point');
                deleteButton.addEventListener('click', function () {
                    if (confirm('Deseja excluir este ponto?')) {
                        fetch('http://localhost:3000/delete', {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                latitude: point.coords[0],
                                longitude: point.coords[1]
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                alert('Ponto excluído com sucesso!');
                                map.removeLayer(marker);
                            } else {
                                alert(`Erro: ${data.message}`);
                            }
                        })
                        .catch(error => console.error('Erro ao excluir ponto:', error));
                    }
                });

const editButton = document.querySelector('.edit-point');
editButton.replaceWith(editButton.cloneNode(true));
const newEditButton = document.querySelector('.edit-point');
                
// Editar ponto
newEditButton.addEventListener('click', function () {
    // Cria o formulário de edição
    const editFormHTML = `
        <div id="edit-popup" style="
                position: fixed; 
                top: 50%; 
                left: 50%; 
                transform: translate(-50%, -50%); 
                background-color: white; 
                padding: 20px; 
                border-radius: 8px; 
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25); 
                width: 400px; 
                z-index: 1000;">
                <h3 style="text-align: center;">Editar Ponto</h3>
                <form id="edit-form">
                    <label for="latitude">Latitude:</label>
                    <input type="text" id="latitude" value="${point.coords[0]}" required>
                    
                    <label for="longitude">Longitude:</label>
                    <input type="text" id="longitude" value="${point.coords[1]}" required>

                    <label for="location">Nome do Local:</label>
                    <input type="text" id="location" value="${point.location}" required>
                    
                    <label for="quality">Qualidade do Ar:</label>
                    <input type="text" id="quality" value="${point.quality}" required>
                    
                    <label for="co2">CO2 (ppm):</label>
                    <input type="text" id="co2" value="${point.co2}" required>

                    <label for="temperature">Temperatura (°C):</label>
                    <input type="text" id="temperature" value="${point.temperature}" required>

                    <label for="humidity">Umidade (%):</label>
                    <input type="text" id="humidity" value="${point.humidity}" required>

                    <label for="so2">SO2 (μg/m³):</label>
                    <input type="text" id="so2" value="${point.so2}" required>

                    <label for="nox">NOx (μg/m³):</label>
                    <input type="text" id="nox" value="${point.nox}" required>
                    
                    <button type="submit">Salvar</button>
                    <button type="button" id="cancel-edit">Cancelar</button>
                </form>
            </div>
        `;

    document.body.insertAdjacentHTML('beforeend', editFormHTML);

    // Cancelar edição
    document.getElementById('cancel-edit').addEventListener('click', function () {
        document.getElementById('edit-popup').remove();
    });

    // Salvar alterações
    document.getElementById('edit-form').addEventListener('submit', async function (event) {
        event.preventDefault();

        const updatedPoint = {
            latitude: point.coords[0],
            longitude: point.coords[1],
            location: document.getElementById('location').value,
            quality: document.getElementById('quality').value,
            co2: document.getElementById('co2').value,
            temperature: document.getElementById('temperature').value,
            humidity: document.getElementById('humidity').value,
            so2: document.getElementById('so2').value,
            nox: document.getElementById('nox').value
            
            
            
            
            
        };

        try {
            const response = await fetch('http://localhost:3000/edit', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPoint),
            });

            const result = await response.json();
            if (response.ok) {
                alert('Ponto atualizado com sucesso!');
                document.getElementById('edit-popup').remove();
                location.reload();

                // Atualizar conteúdo do popup
                marker.bindPopup(createPopupContent(updatedPoint)).openPopup();
            } else {
                alert(`Erro ao atualizar o ponto: ${result.message}`);
            }
        } catch (error) {
            console.error('Erro ao atualizar ponto:', error);
        }
    });
});
});
})
})
.catch(error => console.error('Erro ao carregar pontos:', error));