document.addEventListener('DOMContentLoaded', function() {
    const labels = [
        "2004-03-10 18:00:00", "2004-03-10 19:00:00", "2004-03-10 20:00:00",
        "2004-03-10 21:00:00", "2004-03-10 22:00:00", "2004-03-10 23:00:00",
        "2004-03-11 00:00:00", "2004-03-11 01:00:00", "2004-03-11 02:00:00",
        "2004-03-11 03:00:00", "2004-03-11 04:00:00", "2004-03-11 05:00:00",
        "2004-03-11 06:00:00", "2004-03-11 07:00:00", "2004-03-11 08:00:00",
        "2004-03-11 09:00:00", "2004-03-11 10:00:00", "2004-03-11 11:00:00",
        "2004-03-11 12:00:00", "2004-03-11 13:00:00", "2004-03-11 14:00:00",
        "2004-03-11 15:00:00", "2004-03-11 16:00:00", "2004-03-11 17:00:00",
        "2004-03-11 18:00:00", "2004-03-11 19:00:00", "2004-03-11 20:00:00",
        "2004-03-11 21:00:00", "2004-03-11 22:00:00", "2004-03-11 23:00:00",
        "2004-03-12 00:00:00", "2004-03-12 01:00:00", "2004-03-12 02:00:00",
        "2004-03-12 03:00:00", "2004-03-12 04:00:00", "2004-03-12 05:00:00",
        "2004-03-12 06:00:00", "2004-03-12 07:00:00", "2004-03-12 08:00:00",
        "2004-03-12 09:00:00", "2004-03-12 10:00:00", "2004-03-12 11:00:00",
        "2004-03-12 12:00:00", "2004-03-12 13:00:00", "2004-03-12 14:00:00",
        "2004-03-12 15:00:00", "2004-03-12 16:00:00", "2004-03-12 17:00:00",
        "2004-03-12 18:00:00", "2004-03-12 19:00:00", "2004-03-12 20:00:00",
        "2004-03-12 21:00:00", "2004-03-12 22:00:00", "2004-03-12 23:00:00",
        "2004-03-13 00:00:00", "2004-03-13 01:00:00", "2004-03-13 02:00:00",
        "2004-03-13 03:00:00"
    ];

    const coData = [
        2.6, 2.5, 2.5, 2.6, 2.4, 2.4, 2.4, 2.4, 2.5, 2.4,
        2.6, 2.5, 2.5, 2.6, 2.4, 2.4, 2.4, 2.4, 2.5, 2.4,
        2.6, 2.5, 2.5, 2.6, 2.4, 2.4, 2.4, 2.4, 2.5, 2.4,
        2.6, 2.5, 2.5, 2.6, 2.4, 2.4, 2.4, 2.4, 2.5, 2.4,
        2.6, 2.5, 2.5, 2.6, 2.4, 2.4, 2.4, 2.4, 2.5, 2.4,
        2.6, 2.5, 2.5, 2.6, 2.4, 2.4, 2.4, 2.4, 2.5, 2.4,
        2.6, 2.5, 2.5, 2.6, 2.4, 2.4, 2.4, 2.4, 2.5, 2.4,
        2.6, 2.5, 2.5, 2.6, 2.4, 2.4, 2.4, 2.4, 2.5, 2.4
    ];
    
    const c6h6Data = [
        11.9, 11.8, 11.8, 12.0, 11.5, 11.5, 11.6, 11.6, 11.8, 11.7,
        11.9, 11.8, 11.8, 12.0, 11.5, 11.5, 11.6, 11.6, 11.8, 11.7,
        11.9, 11.8, 11.8, 12.0, 11.5, 11.5, 11.6, 11.6, 11.8, 11.7,
        11.9, 11.8, 11.8, 12.0, 11.5, 11.5, 11.6, 11.6, 11.8, 11.7,
        11.9, 11.8, 11.8, 12.0, 11.5, 11.5, 11.6, 11.6, 11.8, 11.7,
        11.9, 11.8, 11.8, 12.0, 11.5, 11.5, 11.6, 11.6, 11.8, 11.7,
        11.9, 11.8, 11.8, 12.0, 11.5, 11.5, 11.6, 11.6, 11.8, 11.7,
        11.9, 11.8, 11.8, 12.0, 11.5, 11.5, 11.6, 11.6, 11.8, 11.7
    ];
    
    const noxData = [
        166.2, 155.3, 155.2, 165.7, 146.3, 149.6, 149.3, 150.4, 161.0, 154.5,
        166.2, 155.3, 155.2, 165.7, 146.3, 149.6, 149.3, 150.4, 161.0, 154.5,
        166.2, 155.3, 155.2, 165.7, 146.3, 149.6, 149.3, 150.4, 161.0, 154.5,
        166.2, 155.3, 155.2, 165.7, 146.3, 149.6, 149.3, 150.4, 161.0, 154.5,
        166.2, 155.3, 155.2, 165.7, 146.3, 149.6, 149.3, 150.4, 161.0, 154.5,
        166.2, 155.3, 155.2, 165.7, 146.3, 149.6, 149.3, 150.4, 161.0, 154.5,
        166.2, 155.3, 155.2, 165.7, 146.3, 149.6, 149.3, 150.4, 161.0, 154.5,
        166.2, 155.3, 155.2, 165.7, 146.3, 149.6, 149.3, 150.4, 161.0, 154.5
    ];
    
    const no2Data = [
        23.8, 21.7, 21.6, 23.4, 20.2, 21.1, 21.0, 21.3, 22.6, 21.1,
        23.8, 21.7, 21.6, 23.4, 20.2, 21.1, 21.0, 21.3, 22.6, 21.1,
        23.8, 21.7, 21.6, 23.4, 20.2, 21.1, 21.0, 21.3, 22.6, 21.1,
        23.8, 21.7, 21.6, 23.4, 20.2, 21.1, 21.0, 21.3, 22.6, 21.1,
        23.8, 21.7, 21.6, 23.4, 20.2, 21.1, 21.0, 21.3, 22.6, 21.1,
        23.8, 21.7, 21.6, 23.4, 20.2, 21.1, 21.0, 21.3, 22.6, 21.1,
        23.8, 21.7, 21.6, 23.4, 20.2, 21.1, 21.0, 21.3, 22.6, 21.1,
        23.8, 21.7, 21.6, 23.4, 20.2, 21.1, 21.0, 21.3, 22.6, 21.1
    ];


    const ctx = document.getElementById('airQualityChart').getContext('2d');

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'CO (mg/m^3)',
                    data: coData,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: false,
                    spanGaps: true
                },
                {
                    label: 'C6H6 (µg/m^3)',
                    data: c6h6Data,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    fill: false,
                    spanGaps: true
                },
                {
                    label: 'NOx (ppb)',
                    data: noxData,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: false,
                    spanGaps: true
                },
                {
                    label: 'NO2 (µg/m^3)',
                    data: no2Data,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    fill: false,
                    spanGaps: true
                }
            ]
        },
        options: {
            maintainAspectRatio: true,  // Mantém a proporção da tela
            responsive: true,  // Gráfico é responsivo
            scales: {
                x: {
                    type: 'time',
                    time: {
                        parser: 'yyyy-MM-dd HH:mm:ss',
                        unit: 'hour',
                        displayFormats: {
                            hour: 'yyyy-MM-dd HH:mm'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Data e Hora'
                    }
                },
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Concentração'
                    }
                }
            },
            layout: {
                padding: {
                    left: 10,
                    right: 10,
                    top: 20,
                    bottom: 20
                }
            },
            elements: {
                line: {
                    tension: 0.4  // Suaviza as curvas das linhas
                },
                point: {
                    radius: 0  // Remove os pontos dos dados
                }
            }
        }
    });

    // Checkbox event listeners to toggle datasets
    document.getElementById('checkboxCO').addEventListener('change', function() {
        chart.getDatasetMeta(0).hidden = !this.checked;
        chart.update();
    });

    document.getElementById('checkboxC6H6').addEventListener('change', function() {
        chart.getDatasetMeta(1).hidden = !this.checked;
        chart.update();
    });

    document.getElementById('checkboxNOx').addEventListener('change', function() {
        chart.getDatasetMeta(2).hidden = !this.checked;
        chart.update();
    });

    document.getElementById('checkboxNO2').addEventListener('change', function() {
        chart.getDatasetMeta(3).hidden = !this.checked;
        chart.update();
    });
});