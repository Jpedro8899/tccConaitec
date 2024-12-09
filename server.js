const express = require('express');
const fs = require('fs');
const cors = require('cors');
const Joi = require('joi');
const { Parser } = require('json2csv'); // Importa a biblioteca json2csv
const app = express();
const PORT = 3000;

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

// Middleware para configurar CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

// Caminhos para os arquivos JSON e CSV
const jsonFilePath = './pontos.json';
const csvFilePath = './dados.csv';

// Schema de validação para adicionar pontos
const addPointSchema = Joi.object({
    coords: Joi.array().items(
        Joi.number().required().min(-90).max(90),
        Joi.number().required().min(-180).max(180)
    ).length(2),
    location: Joi.string().required(),
    quality: Joi.string().valid('Boa', 'Moderada', 'Ruim').required(),
    co2: Joi.number().optional(),
    temperature: Joi.number().optional(),
    humidity: Joi.number().optional(),
    so2: Joi.number().optional(),
    nox: Joi.number().optional(),
});

// Middleware para validação
function validate(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        next();
    };
}

function convertJsonToCsv() {
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON para conversão:', err);
            return;
        }

        const jsonData = JSON.parse(data).points;

        // Configurar os campos corretamente e garantir a separação de coordenadas
        const rows = jsonData.map(point => ({
            Latitude: point.coords[0],
            Longitude: point.coords[1],
            location: point.location,
            quality: point.quality,
            co2: point.co2 || '',
            temperature: point.temperature || '',
            humidity: point.humidity || '',
            so2: point.so2 || '',
            nox: point.nox || '',
        }));

        const header = [
            'Latitude',
            'Longitude',
            'location',
            'quality',
            'co2',
            'temperature',
            'humidity',
            'so2',
            'nox',
        ].join(';');

        const csvRows = rows.map(row =>
            [
                row.Latitude,
                row.Longitude,
                row.location,
                row.quality,
                row.co2,
                row.temperature,
                row.humidity,
                row.so2,
                row.nox,
            ].join(';')
        );

        const csvContent = [header, ...csvRows].join('\n');

        fs.writeFile(csvFilePath, csvContent, err => {
            if (err) {
                console.error('Erro ao salvar o arquivo CSV:', err);
            } else {
                console.log('Arquivo CSV atualizado com sucesso!');
            }
        });
    });
}

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Rota para carregar todos os pontos
app.get('/pontos', (req, res) => {
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON:', err);
            return res.status(500).json({ success: false, message: 'Erro ao carregar os pontos.' });
        }

        return res.json(JSON.parse(data));
    });
});

// Rota para adicionar um novo ponto
app.post('/add', validate(addPointSchema), (req, res) => {
    const newPoint = req.body;

    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON:', err);
            return res.status(500).json({ success: false, message: 'Erro ao ler o arquivo JSON.' });
        }

        const jsonData = JSON.parse(data);
        jsonData.points.push(newPoint);

        fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error('Erro ao salvar o arquivo JSON:', err);
                return res.status(500).json({ success: false, message: 'Erro ao salvar o arquivo JSON.' });
            }

            // Converte JSON para CSV automaticamente após adicionar o ponto
            convertJsonToCsv();

            return res.json({ success: true, message: 'Ponto adicionado com sucesso.' });
        });
    });
});

// Rota para editar um ponto
app.put('/edit', (req, res) => {
    const { latitude, longitude, location, quality, co2, temperature, humidity, so2, nox } = req.body;

    // Validar campos obrigatórios
    if (!latitude || !longitude) {
        return res.status(400).json({ success: false, message: 'Latitude e Longitude são obrigatórias.' });
    }

    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON:', err);
            return res.status(500).json({ success: false, message: 'Erro ao ler o arquivo JSON.' });
        }

        const jsonData = JSON.parse(data);

        // Encontrar o ponto correspondente com base nas coordenadas
        const pointIndex = jsonData.points.findIndex(
            (point) => point.coords[0] === latitude && point.coords[1] === longitude
        );

        if (pointIndex === -1) {
            return res.status(404).json({ success: false, message: 'Ponto não encontrado.' });
        }

        // Atualizar os dados do ponto
        jsonData.points[pointIndex] = {
            coords: [latitude, longitude],
            location,
            quality,
            co2,
            temperature,
            humidity,
            so2,
            nox,
        };

        // Salvar as alterações no arquivo JSON
        fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error('Erro ao salvar o arquivo JSON:', err);
                return res.status(500).json({ success: false, message: 'Erro ao salvar o arquivo JSON.' });
            }

            // Atualizar o CSV automaticamente após a edição
            convertJsonToCsv();

            return res.json({ success: true, message: 'Ponto atualizado com sucesso.' });
        });
    });
});

// Rota para excluir um ponto
app.delete('/delete', (req, res) => {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
        return res.status(400).json({ success: false, message: 'Coordenadas não fornecidas.' });
    }

    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON:', err);
            return res.status(500).json({ success: false, message: 'Erro ao ler o arquivo JSON.' });
        }

        const jsonData = JSON.parse(data);

        // Procurar e remover o ponto correspondente
        const index = jsonData.points.findIndex(
            (point) => point.coords[0] === latitude && point.coords[1] === longitude
        );

        if (index === -1) {
            return res.status(404).json({ success: false, message: 'Ponto não encontrado.' });
        }

        jsonData.points.splice(index, 1);

        fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error('Erro ao salvar o arquivo JSON:', err);
                return res.status(500).json({ success: false, message: 'Erro ao salvar o arquivo JSON.' });
            }

            // Converte JSON para CSV após excluir o ponto
            convertJsonToCsv();

            return res.json({ success: true, message: 'Ponto excluído com sucesso.' });
        });
    });
});