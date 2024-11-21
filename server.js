const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());
// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
  });

// Caminho para o arquivo JSON
const jsonFilePath = './pontos.json';

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
app.post('/add', (req, res) => {
    const newPoint = req.body;

    if (!newPoint.coords || !newPoint.location || !newPoint.quality) {
        return res.status(400).json({ success: false, message: 'Dados incompletos.' });
    }

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

            return res.json({ success: true, message: 'Ponto adicionado com sucesso.' });
        });
    });
});

// Rota para excluir um ponto
app.delete('/delete', (req, res) => {
    console.log("olaaa")
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
        return res.status(400).json({ success: false, message: 'Coordenadas não fornecidas.' });
    }

    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON:', err);
            return res.status(500).json({ success: false, message: 'Erro ao ler o arquivo JSON.' });
        }

        let jsonData = JSON.parse(data);

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

            return res.json({ success: true, message: 'Ponto excluído com sucesso.' });
        });
    });
});

// Endpoint para editar um ponto
app.put('/edit', (req, res) => {
    console.log("olaaa")
    const { latitude, longitude, location, quality, co2, temperature, humidity, so2, nox } = req.body;

    // Verificação de parâmetros obrigatórios
    if (!latitude || !longitude || !location || !quality || !co2 || !temperature || !humidity || !so2 || !nox) {
        return res.status(400).json({ success: false, message: 'Parâmetros insuficientes para editar o ponto.' });
    }

    // Conversão dos valores para números (caso sejam passados como strings)
    const co2Num = parseFloat(co2);
    const temperatureNum = parseFloat(temperature);
    const humidityNum = parseFloat(humidity);
    const so2Num = parseFloat(so2);
    const noxNum = parseFloat(nox);

    // Verificar se a conversão foi bem-sucedida
    if (isNaN(co2Num) || isNaN(temperatureNum) || isNaN(humidityNum) || isNaN(so2Num) || isNaN(noxNum)) {
        return res.status(400).json({ success: false, message: 'Valores numéricos inválidos para CO2, temperatura, umidade, SO2 ou NOx.' });
    }

    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo pontos.json:', err);
            return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
        }

        let pointsData;
        try {
            pointsData = JSON.parse(data);
        } catch (parseErr) {
            console.error('Erro ao processar o arquivo pontos.json:', parseErr);
            return res.status(500).json({ success: false, message: 'Erro ao processar os dados do ponto.' });
        }

        // Encontrar o ponto correspondente
        const pointIndex = pointsData.points.findIndex(
            (p) => Math.abs(p.coords[0] - latitude) < 0.0001 && Math.abs(p.coords[1] - longitude) < 0.0001
        );

        if (pointIndex === -1) {
            return res.status(404).json({ success: false, message: 'Ponto não encontrado.' });
        }

        // Atualizar os dados do ponto
        pointsData.points[pointIndex] = {
            coords: [latitude, longitude],
            location,
            quality,
            co2: co2Num,
            temperature: temperatureNum,
            humidity: humidityNum,
            so2: so2Num,
            nox: noxNum,
        };

        // Salvar no arquivo pontos.json
        fs.writeFile(jsonFilePath, JSON.stringify(pointsData, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Erro ao salvar o arquivo pontos.json:', writeErr);
                return res.status(500).json({ success: false, message: 'Erro ao salvar o ponto.' });
            }

            res.json({ success: true, message: 'Ponto atualizado com sucesso!' });
        });
    });
});