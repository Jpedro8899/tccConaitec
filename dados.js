function updateChart(data, gas) {
    console.log("Iniciando atualização do gráfico...");
    d3.dsv(';', 'dados.csv').then(function (data) {
        console.log("Dados carregados do CSV:", data);
    
        // Verificar se há dados
        if (data.length === 0) {
            console.error("Erro: Nenhum dado encontrado no CSV.");
            return;
        }
    
        // Renderizar os dados na tabela
        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.Latitude || '-'}</td>
                <td>${row.Longitude || '-'}</td>
                <td>${row.location || '-'}</td>
                <td>${row.quality || '-'}</td>
                <td>${row.co2 || '-'}</td>
                <td>${row.temperature || '-'}</td>
                <td>${row.humidity || '-'}</td>
                <td>${row.so2 || '-'}</td>
                <td>${row.nox || '-'}</td>
            `;
            tableBody.appendChild(tr);
        });
    
        console.log("Tabela renderizada com sucesso.");
    }).catch(error => {
        console.error("Erro ao carregar o CSV:", error);
    });

    // Verificar se o elemento canvas existe
    const canvas = document.getElementById('airQualityChart');
    if (!canvas) {
        console.error("Erro: Elemento canvas com ID 'airQualityChart' não encontrado no DOM.");
        return;
    }

    // Obter o contexto do canvas
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error("Erro: Não foi possível obter o contexto 2D do canvas.");
        return;
    }

    // Preparar dados para o gráfico
    const labels = data.map(row => row.location || "Localização Desconhecida");
    const values = data.map(row => {
        const value = parseFloat(row[gas]);
        if (isNaN(value)) {
            console.warn(`Valor inválido para '${gas}':`, row[gas]);
            return 0;
        }
        return value;
    });

    console.log(`Labels (${labels.length}):`, labels);
    console.log(`Valores (${gas}):`, values);

    // Verificar se há dados válidos
    if (!values.some(value => value > 0)) {
        console.warn(`Nenhum valor válido encontrado para o gás '${gas}'.`);
        return;
    }

    // Destruir gráfico antigo, se existir
    if (window.airQualityChart) {
        window.airQualityChart.destroy();
    }

    // Criar novo gráfico
    window.airQualityChart = new Chart(ctx, {
        type: 'line', // Tipo do gráfico
        data: {
            labels: labels,
            datasets: [{
                label: `${gas.toUpperCase()} - Concentração`,
                data: values,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: Math.max(...values) + 10,
                    title: {
                        display: true,
                        text: 'Concentração'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Localizações'
                    }
                }
            }
        }
    });

    console.log("Gráfico atualizado com sucesso.");
}

const columns = ["coords[0]", "coords[1]", "location", "quality", "co2", "temperature", "humidity", "so2", "nox"];
const tableBody = document.querySelector('#airQualityTable tbody');

document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.querySelector('#airQualityTable tbody');

    d3.dsv(";", 'dados.csv').then(function(data) {
        console.log("Dados carregados do CSV:", data);

        // Verificar se há dados
        if (data.length === 0) {
            console.error("Erro: Nenhum dado encontrado no CSV.");
            return;
        }

        // Renderizar os dados na tabela
        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row["Latitude"] || '-'}</td>
                <td>${row["Longitude"] || '-'}</td>
                <td>${row.location || '-'}</td>
                <td>${row.quality || '-'}</td>
                <td>${row.co2 || '-'}</td>
                <td>${row.temperature || '-'}</td>
                <td>${row.humidity || '-'}</td>
                <td>${row.so2 || '-'}</td>
                <td>${row.nox || '-'}</td>
            `;
            tableBody.appendChild(tr);
        });

        console.log("Tabela renderizada com sucesso.");
    }).catch(error => {
        console.error("Erro ao carregar o CSV:", error);
    });
});

document.getElementById('qualityFilter').addEventListener('change', function() {
    const filterValue = this.value;
    document.querySelectorAll('#airQualityTable tbody tr').forEach(row => {
        const qualityCell = row.cells[3]; // 4ª coluna (Qualidade)
        if (filterValue === 'all' || (qualityCell && qualityCell.textContent.trim() === filterValue)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});
// Selecionar todas as linhas da tabela
document.querySelectorAll('#airQualityTable tbody tr').forEach(row => {
    const qualityCell = row.cells[3]; // 4ª coluna (Qualidade)

    if (qualityCell) {
        const quality = qualityCell.textContent.trim();

        // Adicionar evento de mouseover
        row.addEventListener('mouseover', () => {
            if (quality === 'Boa') {
                row.style.backgroundColor = 'rgba(144, 238, 144, 0.7)'; // Verde claro
            } else if (quality === 'Moderada') {
                row.style.backgroundColor = 'rgba(255, 255, 102, 0.7)'; // Amarelo claro
            } else if (quality === 'Ruim') {
                row.style.backgroundColor = 'rgba(255, 99, 71, 0.7)'; // Vermelho claro
            }
        });

        // Adicionar evento de mouseout (voltar ao estado original)
        row.addEventListener('mouseout', () => {
            row.style.backgroundColor = ''; // Remove o estilo inline
        });
    }
});
document.addEventListener('DOMContentLoaded', function () {
    // Selecionar o corpo da tabela
    const tableBody = document.querySelector('#airQualityTable tbody');

    if (!tableBody) {
        console.error("Erro: Corpo da tabela não encontrado.");
        return;
    }

    // Função para aplicar os eventos de hover
    function applyHoverEffects(rows) {
        rows.forEach(row => {
            const qualityCell = row.cells[3]; // 4ª coluna (Qualidade)

            if (qualityCell) {
                const quality = qualityCell.textContent.trim(); // Obter o texto da célula

                // Evento: Passar o mouse sobre a linha
                row.addEventListener('mouseover', () => {
                    if (quality === 'Boa') {
                        row.style.backgroundColor = 'rgba(144, 238, 144, 0.7)'; // Verde claro
                    } else if (quality === 'Moderada') {
                        row.style.backgroundColor = 'rgba(255, 255, 102, 0.7)'; // Amarelo claro
                    } else if (quality === 'Ruim') {
                        row.style.backgroundColor = 'rgba(255, 99, 71, 0.7)'; // Vermelho claro
                    }
                });

                // Evento: Retirar o mouse da linha
                row.addEventListener('mouseout', () => {
                    row.style.backgroundColor = ''; // Remove o estilo inline
                });
            }
        });

        console.log("Efeitos de hover aplicados às novas linhas.");
    }

    // Usar MutationObserver para monitorar mudanças no corpo da tabela
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                const newRows = Array.from(mutation.addedNodes).filter(node => node.tagName === 'TR');
                applyHoverEffects(newRows);
            }
        });
    });

    // Observar o corpo da tabela
    observer.observe(tableBody, { childList: true });

    console.log("Monitorando alterações na tabela.");
});

document.addEventListener('DOMContentLoaded', function () {
    // Selecionar o botão de download
    const downloadButton = document.getElementById('download');

    if (downloadButton) {
        downloadButton.addEventListener('click', function () {
            // Selecionar a tabela
            const table = document.querySelector('#airQualityTable');

            if (!table) {
                console.error("Erro: Tabela não encontrada.");
                return;
            }

            // Converter a tabela em um arquivo CSV
            let csvContent = '';
            const rows = table.querySelectorAll('tr');

            rows.forEach(row => {
                const cols = row.querySelectorAll('th, td');
                const rowData = Array.from(cols).map(col => col.textContent.trim());
                csvContent += rowData.join(',') + '\n';
            });

            // Criar o arquivo CSV e baixar
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'tabela_qualidade_ar.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    } else {
        console.warn("Aviso: Botão de download não encontrado.");
    }
});

document.getElementById('downloadExcel').addEventListener('click', function () {
    // Selecionar a tabela
    const table = document.querySelector('#airQualityTable');
    if (!table) {
        console.error("Erro: Tabela não encontrada.");
        return;
    }

    // Converter a tabela para um array de objetos
    const rows = table.querySelectorAll('tr');
    const data = Array.from(rows).map(row => {
        const cols = row.querySelectorAll('th, td');
        return Array.from(cols).map(col => col.textContent.trim());
    });

    // Criar uma planilha (worksheet)
    const ws = XLSX.utils.aoa_to_sheet(data);

    // Criar um arquivo Excel (workbook)
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Qualidade do Ar');

    // Baixar o arquivo Excel
    XLSX.writeFile(wb, 'tabela_qualidade_ar.xlsx');
});
