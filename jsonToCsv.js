const fs = require('fs');
const { Parser } = require('json2csv');

// Caminhos dos arquivos
const jsonFilePath = './pontos.json';
const csvFilePath = './dados.csv';

// Ler o arquivo JSON
fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Erro ao ler o arquivo JSON:', err);
        return;
    }

    try {
        const jsonData = JSON.parse(data);

        // Limpar e formatar os dados
        jsonData.points.forEach(point => {
            point.Latitude = point.coords[0] || ''; // Extrai latitude
            point.Longitude = point.coords[1] || ''; // Extrai longitude
            point.location = point.location.trim(); // Remove espaços
            point.co2 = parseFloat(point.co2) || 0;
            point.temperature = parseFloat(point.temperature) || 0;
            point.humidity = parseFloat(point.humidity) || 0;
            point.so2 = parseFloat(point.so2) || 0;
            point.nox = parseFloat(point.nox) || 0;
        });

        // Configurar campos e separador
        const fields = ['Latitude', 'Longitude', 'location', 'quality', 'co2', 'temperature', 'humidity', 'so2', 'nox'];
        const opts = { fields, delimiter: ';' };

        // Converter para CSV
        const parser = new Parser(opts);
        const csv = parser.parse(jsonData.points);

        // Salvar o arquivo CSV
        fs.writeFile(csvFilePath, csv, (err) => {
            if (err) {
                console.error('Erro ao salvar o arquivo CSV:', err);
            } else {
                console.log('Arquivo CSV gerado com sucesso em:', csvFilePath);
            }
        });
    } catch (parseErr) {
        console.error('Erro ao processar o JSON:', parseErr);
    }
});
