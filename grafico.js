document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('airQualityChart').getContext('2d');

    let airQualityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Rótulos das localizações
            datasets: [
                {
                    label: 'CO2 (mg/m³)',
                    data: [],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1
                },
                {
                    label: 'SO2 (µg/m³)',
                    data: [],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 1
                },
                {
                    label: 'NOx (µg/m³)',
                    data: [],
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderWidth: 1
                },
                {
                    label: 'Temperatura (°C)',
                    data: [],
                    borderColor: 'rgba(255, 206, 86, 1)',
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderWidth: 1
                },
                {
                    label: 'Umidade Relativa (%)',
                    data: [],
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Localizações'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Valores'
                    }
                }
            }
        }
    });

    // Carregar os dados do CSV com delimitador ponto e vírgula
    d3.dsv(';', 'dados.csv').then(data => {
        console.log('Dados carregados do CSV:', data);

        // Extrair as colunas relevantes do CSV
        const locations = data.map(row => row.location.trim() || 'Desconhecido');
        const co2Values = data.map(row => parseFloat(row.co2.replace(',', '.')) || 0);
        const so2Values = data.map(row => parseFloat(row.so2.replace(',', '.')) || 0);
        const noxValues = data.map(row => parseFloat(row.nox.replace(',', '.')) || 0);
        const temperatureValues = data.map(row => parseFloat(row.temperature.replace(',', '.')) || 0);
        const humidityValues = data.map(row => parseFloat(row.humidity.replace(',', '.')) || 0);

        console.log('Localizações extraídas (labels):', locations);
        console.log('Valores extraídos:', { co2Values, so2Values, noxValues, temperatureValues, humidityValues });

        // Atualizar os dados do gráfico
        airQualityChart.data.labels = locations;
        airQualityChart.data.datasets[0].data = co2Values;
        airQualityChart.data.datasets[1].data = so2Values;
        airQualityChart.data.datasets[2].data = noxValues;
        airQualityChart.data.datasets[3].data = temperatureValues;
        airQualityChart.data.datasets[4].data = humidityValues;

        airQualityChart.update();
    }).catch(error => console.error('Erro ao carregar o CSV:', error));
});
