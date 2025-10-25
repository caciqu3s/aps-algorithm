// ========================================
// ANÁLISE COMPARATIVA DE ALGORITMOS DE ORDENAÇÃO
// ========================================

// Referências do DOM
let chart = null;

// Elementos do DOM
const elements = {
    bubbleSortCheck: null,
    mergeSortCheck: null,
    quickSortCheck: null,
    inputSize: null,
    dataType: null,
    dataSourceRadios: null,
    fileInput: null,
    fileUploadGroup: null,
    runButton: null,
    previewDataButton: null,
    statusMessage: null,
    chartCanvas: null,
    resultsTable: null,
    dataSize: null,
    dataTypeDisplay: null,
    dataSourceDisplay: null,
    dataPreviewPanel: null,
    dataDisplay: null,
    showAllDataBtn: null,
    showSampleDataBtn: null,
    showStatsDataBtn: null,
    sortedDataPanel: null,
    sortedAlgorithmsTabs: null,
    sortedDataContent: null
};

// Variáveis globais para armazenar os dados
let currentDataset = null;
let sortedResults = {}; // Armazena os dados ordenados por cada algoritmo

// ========================================
// ALGORITMOS DE ORDENAÇÃO
// ========================================

/**
 * Bubble Sort com otimização
 * Complexidade: O(n) melhor caso, O(n²) caso médio e pior caso
 */
function bubbleSort(arr) {
    const n = arr.length;
    let trocou;
    
    for (let i = 0; i < n - 1; i++) {
        trocou = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Troca os elements
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                trocou = true;
            }
        }
        
        // Se nenhuma troca foi feita, o array já está ordenado
        if (!trocou) {
            break;
        }
    }
    
    return arr;
}

/**
 * Merge Sort recursivo (dividir para conquistar)
 * Complexidade: O(n log n) em todos os casos
 */
function mergeSort(arr) {
    // Caso base: arrays com 1 elemento ou vazios já estão ordenados
    if (arr.length <= 1) {
        return arr;
    }
    
    // Divide o array na metade
    const meio = Math.floor(arr.length / 2);
    const esquerda = arr.slice(0, meio);
    const direita = arr.slice(meio);
    
    // Recursivamente ordena as duas metades
    const esquerdaOrdenada = mergeSort(esquerda);
    const direitaOrdenada = mergeSort(direita);
    
    // Intercala as duas metades ordenadas
    return merge(esquerdaOrdenada, direitaOrdenada);
}

/**
 * Função auxiliar para intercalar dois arrays ordenados
 */
function merge(esquerda, direita) {
    const resultado = [];
    let i = 0;
    let j = 0;
    
    // Compara elementos dos dois arrays e adiciona o menor no resultado
    while (i < esquerda.length && j < direita.length) {
        if (esquerda[i] <= direita[j]) {
            resultado.push(esquerda[i]);
            i++;
        } else {
            resultado.push(direita[j]);
            j++;
        }
    }
    
    // Adiciona os elementos restantes (se houver)
    while (i < esquerda.length) {
        resultado.push(esquerda[i]);
        i++;
    }
    
    while (j < direita.length) {
        resultado.push(direita[j]);
        j++;
    }
    
    return resultado;
}

/**
 * Quick Sort recursivo com último elemento como pivô
 * Complexidade: O(n log n) melhor e caso médio, O(n²) pior caso
 */
function quickSort(arr, baixo = 0, alto = arr.length - 1) {
    if (baixo < alto) {
        // Encontra a posição do pivô após particionamento
        const indicePivo = partition(arr, baixo, alto);
        
        // Recursivamente ordena os elementos antes e depois do pivô
        quickSort(arr, baixo, indicePivo - 1);
        quickSort(arr, indicePivo + 1, alto);
    }
    
    return arr;
}

/**
 * Função auxiliar para particionamento in-place
 * Usa o último elemento como pivô
 */
function partition(arr, baixo, alto) {
    const pivo = arr[alto]; // Último elemento como pivô
    let i = baixo - 1; // Índice do menor elemento
    
    for (let j = baixo; j < alto; j++) {
        // Se o element atual é menor ou igual ao pivô
        if (arr[j] <= pivo) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Troca
        }
    }
    
    // Coloca o pivô na posição correta
    [arr[i + 1], arr[alto]] = [arr[alto], arr[i + 1]];
    
    return i + 1;
}

// ========================================
// GERAÇÃO DE DADOS
// ========================================

/**
 * Gera array com números aleatórios
 */
function generateRandomArray(size) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * size) + 1);
    }
    return arr;
}

/**
 * Gera array ordenado [1, 2, 3, ..., n]
 */
function generateSortedArray(size) {
    const arr = [];
    for (let i = 1; i <= size; i++) {
        arr.push(i);
    }
    return arr;
}

/**
 * Gera array inversamente ordenado [n, n-1, ..., 1]
 */
function generateReversedArray(size) {
    const arr = [];
    for (let i = size; i >= 1; i--) {
        arr.push(i);
    }
    return arr;
}

/**
 * Gera array quase ordenado (ordenado com ~10% de trocas aleatórias)
 */
function generateAlmostSortedArray(size) {
    // Começa com array ordenado
    const arr = generateSortedArray(size);
    
    // Realiza trocas aleatórias em ~10% dos elementos
    const numTrocas = Math.floor(size * 0.1);
    
    for (let i = 0; i < numTrocas; i++) {
        const pos1 = Math.floor(Math.random() * size);
        const pos2 = Math.floor(Math.random() * size);
        [arr[pos1], arr[pos2]] = [arr[pos2], arr[pos1]];
    }
    
    return arr;
}

// ========================================
// CARREGAMENTO DE ARQUIVO
// ========================================

/**
 * Processa arquivo carregado pelo usuário
 */
function processFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            try {
                const content = event.target.result;
                
                // Processa conteúdo: números separados por vírgula, espaço ou quebra de linha
                const numbers = content
                    .split(/[,\s\n\r]+/)
                    .map(str => str.trim())
                    .filter(str => str !== '')
                    .map(str => parseFloat(str))
                    .filter(num => !isNaN(num));
                
                if (numbers.length === 0) {
                    reject(new Error('Nenhum número válido encontrado no arquivo'));
                    return;
                }
                
                resolve(numbers);
            } catch (error) {
                reject(new Error('Erro ao processar arquivo: ' + error.message));
            }
        };
        
        reader.onerror = function() {
            reject(new Error('Erro ao ler arquivo'));
        };
        
        reader.readAsText(file);
    });
}

// ========================================
// MEDIÇÃO DE DESEMPENHO
// ========================================

/**
 * Função principal de análise
 */
async function runAnalysis() {
    try {
        // Desabilita botão e mostra status
        elements.runButton.disabled = true;
        elements.runButton.innerHTML = '<span class="loading-spinner"></span>Executando...';
        showStatus('Iniciando análise...', 'loading');
        
        // Obtém parâmetros da UI
        const algorithms = getSelectedAlgorithms();
        const size = parseInt(elements.inputSize.value);
        const dataType = elements.dataType.value;
        const dataSource = getSelectedDataSource();
        
        // Validações
        if (algorithms.length === 0) {
            throw new Error('Selecione pelo menos um algoritmo');
        }
        
        if (size < 10 || size > 10000) {
            throw new Error('Tamanho deve estar entre 10 e 10.000');
        }
        
        // Gera ou carrega dados (usa dados já carregados se disponível)
        let originalData;
        let dataSourceLabel;
        
        if (currentDataset && 
            ((dataSource === 'generate' && currentDataset.length === size) || 
             (dataSource === 'file'))) {
            // Usa dados já carregados
            originalData = currentDataset;
            dataSourceLabel = dataSource === 'file' ? 'Arquivo Externo' : 'Geração Interna';
            showStatus('Usando dados já carregados...', 'loading');
        } else if (dataSource === 'file') {
            const fileInput = elements.fileInput;
            if (!fileInput.files.length) {
                throw new Error('Selecione um arquivo');
            }
            
            showStatus('Carregando arquivo...', 'loading');
            originalData = await processFile(fileInput.files[0]);
            currentDataset = originalData; // Armazena para próximas visualizações
            dataSourceLabel = 'Arquivo Externo';
        } else {
            showStatus('Gerando dados...', 'loading');
            originalData = generateDataArray(dataType, size);
            currentDataset = originalData; // Armazena para próximas visualizações
            dataSourceLabel = 'Geração Interna';
        }
        
        // Atualiza informações do conjunto de dados
        updateDataInfo(originalData.length, getDataTypeLabel(dataType), dataSourceLabel);
        
        // Executa análise
        showStatus('Executando algoritmos...', 'loading');
        const results = await performAnalysis(algorithms, originalData);
        
        // Atualiza visualizações
        showStatus('Atualizando visualizações...', 'loading');
        renderChart(results);
        updateTable(results);
        
        showStatus(`Análise concluída! ${results.length} algoritmo(s) executado(s).`, 'success');
        
    } catch (error) {
        console.error('Erro na análise:', error);
        showStatus(`Erro: ${error.message}`, 'error');
    } finally {
        // Reabilita botão
        elements.runButton.disabled = false;
        elements.runButton.innerHTML = '🚀 Executar Análise';
    }
}

/**
 * Executa análise de desempenho dos algoritmos
 */
async function performAnalysis(algorithms, originalData) {
    const results = [];
    sortedResults = {}; // Reset dos resultados ordenados
    
    for (const algorithm of algorithms) {
        // Cria cópia dos dados para cada algoritmo
        const dataCopy = [...originalData];
        
        // Medição de tempo com performance.now()
        const t0 = performance.now();
        
        // Executa algoritmo e armazena resultado
        let sortedData;
        switch (algorithm.name) {
            case 'bubbleSort':
                sortedData = bubbleSort(dataCopy);
                break;
            case 'mergeSort':
                sortedData = mergeSort(dataCopy);
                break;
            case 'quickSort':
                sortedData = quickSort(dataCopy);
                break;
        }
        
        const t1 = performance.now();
        const executionTime = t1 - t0;
        
        // Armazena dados ordenados para visualização
        sortedResults[algorithm.name] = {
            data: sortedData,
            algorithm: algorithm,
            executionTime: executionTime,
            originalSize: originalData.length
        };
        
        results.push({
            name: algorithm.label,
            algorithmKey: algorithm.name,
            time: executionTime,
            complexity: algorithm.complexity,
            type: algorithm.type
        });
        
        // Pequena pausa para não travar a UI
        await new Promise(resolve => setTimeout(resolve, 10));
    }
    
    return results;
}

// ========================================
// VISUALIZAÇÃO DOS RESULTADOS
// ========================================

/**
 * Renderiza gráfico de barras com Chart.js
 */
function renderChart(results) {
    const ctx = elements.chartCanvas.getContext('2d');
    
    // Destrói gráfico anterior se existir
    if (chart) {
        chart.destroy();
    }
    
    // Prepara dados
    const labels = results.map(result => result.name);
    const data = results.map(result => result.time);
    const backgroundColors = [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 205, 86, 0.8)'
    ];
    const borderColors = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 205, 86, 1)'
    ];
    
    // Cria novo gráfico
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Tempo de Execução (ms)',
                data: data,
                backgroundColor: backgroundColors.slice(0, results.length),
                borderColor: borderColors.slice(0, results.length),
                borderWidth: 2,
                borderRadius: 5,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Comparação de Desempenho dos Algoritmos',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Tempo (milissegundos)',
                        font: {
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Algoritmos',
                        font: {
                            weight: 'bold'
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            }
        }
    });
}

/**
 * Atualiza tabela de resultados
 */
function updateTable(results) {
    const tbody = elements.resultsTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    results.forEach(result => {
        const row = tbody.insertRow();
        
        // Nome do algoritmo
        const nameCell = row.insertCell();
        nameCell.textContent = result.name;
        nameCell.style.fontWeight = 'bold';
        
        // Tempo de execução
        const timeCell = row.insertCell();
        timeCell.textContent = formatTime(result.time);
        
        // Complexidade
        const complexityCell = row.insertCell();
        complexityCell.textContent = result.complexity;
        complexityCell.style.fontFamily = 'monospace';
        
        // Tipo
        const typeCell = row.insertCell();
        typeCell.textContent = result.type;
        
        // Botão para visualizar dados ordenados
        const actionCell = row.insertCell();
        const viewButton = document.createElement('button');
        viewButton.className = 'view-sorted-btn';
        viewButton.textContent = '👁️ Ver Ordenados';
        viewButton.onclick = () => showSortedDataPanel(result.algorithmKey);
        actionCell.appendChild(viewButton);
    });
}

// ========================================
// FUNÇÕES AUXILIARES
// ========================================

/**
 * Obtém algoritmos selecionados
 */
function getSelectedAlgorithms() {
    const algorithms = [];
    
    if (elements.bubbleSortCheck.checked) {
        algorithms.push({
            name: 'bubbleSort',
            label: 'Bubble Sort',
            complexity: 'O(n²)',
            type: 'Comparação'
        });
    }
    
    if (elements.mergeSortCheck.checked) {
        algorithms.push({
            name: 'mergeSort',
            label: 'Merge Sort',
            complexity: 'O(n log n)',
            type: 'Divisão e Conquista'
        });
    }
    
    if (elements.quickSortCheck.checked) {
        algorithms.push({
            name: 'quickSort',
            label: 'Quick Sort',
            complexity: 'O(n log n)',
            type: 'Divisão e Conquista'
        });
    }
    
    return algorithms;
}

/**
 * Obtém fonte de dados selecionada
 */
function getSelectedDataSource() {
    const checkedRadio = document.querySelector('input[name="data-source"]:checked');
    return checkedRadio ? checkedRadio.value : 'generate';
}

/**
 * Gera array de dados baseado no tipo
 */
function generateDataArray(type, size) {
    switch (type) {
        case 'random':
            return generateRandomArray(size);
        case 'sorted':
            return generateSortedArray(size);
        case 'reversed':
            return generateReversedArray(size);
        case 'almost-sorted':
            return generateAlmostSortedArray(size);
        default:
            return generateRandomArray(size);
    }
}

/**
 * Obtém label do tipo de dados
 */
function getDataTypeLabel(type) {
    const labels = {
        'random': 'Aleatório',
        'sorted': 'Ordenado',
        'reversed': 'Inversamente Ordenado',
        'almost-sorted': 'Quase Ordenado'
    };
    return labels[type] || 'Desconhecido';
}

/**
 * Formata tempo de execução
 */
function formatTime(time) {
    if (time < 0.01) {
        return '< 0.01 ms';
    } else if (time < 1) {
        return time.toFixed(3) + ' ms';
    } else if (time < 1000) {
        return time.toFixed(2) + ' ms';
    } else {
        return (time / 1000).toFixed(2) + ' s';
    }
}

/**
 * Mostra mensagem de status
 */
function showStatus(message, type = '') {
    elements.statusMessage.textContent = message;
    elements.statusMessage.className = `status-message ${type}`;
}

/**
 * Atualiza informações do conjunto de dados
 */
function updateDataInfo(size, type, source) {
    elements.dataSize.textContent = size.toLocaleString();
    elements.dataTypeDisplay.textContent = type;
    elements.dataSourceDisplay.textContent = source;
}

/**
 * Controla visibilidade do upload de arquivo
 */
function toggleFileUpload() {
    const dataSource = getSelectedDataSource();
    elements.fileUploadGroup.style.display = dataSource === 'file' ? 'block' : 'none';
}

// ========================================
// VISUALIZAÇÃO DOS DADOS
// ========================================

/**
 * Função para gerar e visualizar dados
 */
async function previewData() {
    try {
        elements.previewDataButton.disabled = true;
        elements.previewDataButton.innerHTML = '<span class="loading-spinner"></span>Carregando...';
        
        // Obtém parâmetros da UI
        const size = parseInt(elements.inputSize.value);
        const dataType = elements.dataType.value;
        const dataSource = getSelectedDataSource();
        
        // Validações
        if (size < 10 || size > 10000) {
            throw new Error('Tamanho deve estar entre 10 e 10.000');
        }
        
        // Gera ou carrega dados
        if (dataSource === 'file') {
            const fileInput = elements.fileInput;
            if (!fileInput.files.length) {
                throw new Error('Selecione um arquivo');
            }
            
            currentDataset = await processFile(fileInput.files[0]);
        } else {
            currentDataset = generateDataArray(dataType, size);
        }
        
        // Mostra painel de visualização
        elements.dataPreviewPanel.style.display = 'block';
        
        // Exibe dados por padrão em modo amostra
        showDataSample();
        
        // Atualiza informações
        updateDataInfo(currentDataset.length, getDataTypeLabel(dataType), 
                      dataSource === 'file' ? 'Arquivo Externo' : 'Geração Interna');
        
    } catch (error) {
        console.error('Erro ao visualizar dados:', error);
        showStatus(`Erro: ${error.message}`, 'error');
    } finally {
        elements.previewDataButton.disabled = false;
        elements.previewDataButton.innerHTML = '👁️ Visualizar Dados';
    }
}

/**
 * Mostra todos os dados
 */
function showAllData() {
    if (!currentDataset) return;
    
    setActiveDataControl('show-all-data');
    
    const display = elements.dataDisplay;
    display.innerHTML = `
        <div class="data-array">
            <strong>Dados completos (${currentDataset.length} elementos):</strong><br><br>
            [${currentDataset.join(', ')}]
        </div>
    `;
}

/**
 * Mostra amostra dos dados (primeiros e últimos elementos)
 */
function showDataSample() {
    if (!currentDataset) return;
    
    setActiveDataControl('show-sample-data');
    
    const display = elements.dataDisplay;
    const sampleSize = 25; // 25 do início + 25 do fim = 50 total
    
    if (currentDataset.length <= 50) {
        display.innerHTML = `
            <div class="data-array">
                <strong>Dados completos (${currentDataset.length} elementos):</strong><br><br>
                [${currentDataset.join(', ')}]
            </div>
        `;
    } else {
        const beginning = currentDataset.slice(0, sampleSize);
        const end = currentDataset.slice(-sampleSize);
        
        display.innerHTML = `
            <div class="data-array">
                <strong>Amostra dos dados (${currentDataset.length} elementos):</strong><br><br>
                <strong>Primeiros ${sampleSize}:</strong><br>
                [${beginning.join(', ')}]<br><br>
                <strong>... (${currentDataset.length - 50} elementos omitidos) ...</strong><br><br>
                <strong>Últimos ${sampleSize}:</strong><br>
                [${end.join(', ')}]
            </div>
        `;
    }
}

/**
 * Mostra estatísticas dos dados
 */
function showDataStatistics() {
    if (!currentDataset) return;
    
    setActiveDataControl('show-stats-data');
    
    const stats = calculateStatistics(currentDataset);
    
    const display = elements.dataDisplay;
    display.innerHTML = `
        <div class="data-stats">
            <div class="stat-item">
                <div class="stat-label">Tamanho</div>
                <div class="stat-value">${stats.size}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Mínimo</div>
                <div class="stat-value">${stats.min}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Máximo</div>
                <div class="stat-value">${stats.max}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Média</div>
                <div class="stat-value">${stats.average}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Mediana</div>
                <div class="stat-value">${stats.median}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Amplitude</div>
                <div class="stat-value">${stats.range}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Únicos</div>
                <div class="stat-value">${stats.unique}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Duplicatas</div>
                <div class="stat-value">${stats.duplicates}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Ordenado?</div>
                <div class="stat-value">${stats.isSorted ? 'Sim' : 'Não'}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Inv. Ordenado?</div>
                <div class="stat-value">${stats.isReversed ? 'Sim' : 'Não'}</div>
            </div>
        </div>
    `;
}

/**
 * Calcula estatísticas do dataset
 */
function calculateStatistics(data) {
    const sorted = [...data].sort((a, b) => a - b);
    const size = data.length;
    const uniqueValues = new Set(data);
    
    // Verifica se está ordenado
    let isSorted = true;
    let isReversed = true;
    
    for (let i = 1; i < data.length; i++) {
        if (data[i] < data[i-1]) isSorted = false;
        if (data[i] > data[i-1]) isReversed = false;
    }
    
    return {
        size: size,
        min: Math.min(...data),
        max: Math.max(...data),
        average: (data.reduce((sum, val) => sum + val, 0) / size).toFixed(2),
        median: size % 2 === 0 
            ? ((sorted[size/2 - 1] + sorted[size/2]) / 2).toFixed(2)
            : sorted[Math.floor(size/2)],
        range: Math.max(...data) - Math.min(...data),
        unique: uniqueValues.size,
        duplicates: size - uniqueValues.size,
        isSorted: isSorted,
        isReversed: isReversed
    };
}

/**
 * Define o botão ativo nos controles de dados
 */
function setActiveDataControl(activeId) {
    // Remove classe active de todos os botões
    elements.showAllDataBtn.classList.remove('active');
    elements.showSampleDataBtn.classList.remove('active');
    elements.showStatsDataBtn.classList.remove('active');
    
    // Adiciona classe active ao botão selecionado
    switch(activeId) {
        case 'show-all-data':
            elements.showAllDataBtn.classList.add('active');
            break;
        case 'show-sample-data':
            elements.showSampleDataBtn.classList.add('active');
            break;
        case 'show-stats-data':
            elements.showStatsDataBtn.classList.add('active');
            break;
    }
}

// ========================================
// VISUALIZAÇÃO DOS DADOS ORDENADOS
// ========================================

/**
 * Mostra painel de dados ordenados e inicializa com algoritmo específico
 */
function showSortedDataPanel(algorithmKey = null) {
    // Mostra o painel
    elements.sortedDataPanel.style.display = 'block';
    
    // Cria tabs dos algoritmos
    createAlgorithmTabs();
    
    // Se um algoritmo específico foi solicitado, mostra ele
    if (algorithmKey && sortedResults[algorithmKey]) {
        showSortedData(algorithmKey);
    } else {
        // Senão, mostra o primeiro algoritmo disponível
        const firstAlgorithm = Object.keys(sortedResults)[0];
        if (firstAlgorithm) {
            showSortedData(firstAlgorithm);
        }
    }
    
    // Rola até o painel
    elements.sortedDataPanel.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Cria tabs para seleção de algoritmos
 */
function createAlgorithmTabs() {
    const tabsContainer = elements.sortedAlgorithmsTabs;
    tabsContainer.innerHTML = '';
    
    Object.keys(sortedResults).forEach(algorithmKey => {
        const result = sortedResults[algorithmKey];
        const tab = document.createElement('div');
        tab.className = 'algorithm-tab';
        tab.onclick = () => showSortedData(algorithmKey);
        
        tab.innerHTML = `
            <span>${result.algorithm.label}</span>
            <span class="algorithm-status">${formatTime(result.executionTime)}</span>
        `;
        
        tabsContainer.appendChild(tab);
    });
}

/**
 * Exibe dados ordenados de um algoritmo específico
 */
function showSortedData(algorithmKey) {
    const result = sortedResults[algorithmKey];
    if (!result) return;
    
    // Atualiza tabs ativos
    document.querySelectorAll('.algorithm-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Marca tab ativo
    const tabs = document.querySelectorAll('.algorithm-tab');
    const algorithmIndex = Object.keys(sortedResults).indexOf(algorithmKey);
    if (tabs[algorithmIndex]) {
        tabs[algorithmIndex].classList.add('active');
    }
    
    // Calcula estatísticas dos dados ordenados
    const sortedStats = calculateSortedDataStatistics(result.data, currentDataset);
    
    // Atualiza conteúdo
    elements.sortedDataContent.innerHTML = `
        <div class="sorted-data-header">
            <h4>${result.algorithm.label} - Dados Ordenados</h4>
        </div>
        
        <div class="sorted-data-info">
            <div class="sorted-info-item">
                <div class="sorted-info-label">Tempo de Execução</div>
                <div class="sorted-info-value">${formatTime(result.executionTime)}</div>
            </div>
            <div class="sorted-info-item">
                <div class="sorted-info-label">Elementos</div>
                <div class="sorted-info-value">${result.data.length.toLocaleString()}</div>
            </div>
            <div class="sorted-info-item">
                <div class="sorted-info-label">Corretamente Ordenado</div>
                <div class="sorted-info-value">${sortedStats.isCorrectlySorted ? '✅ Sim' : '❌ Não'}</div>
            </div>
            <div class="sorted-info-item">
                <div class="sorted-info-label">Trocas Necessárias</div>
                <div class="sorted-info-value">${sortedStats.swapsNeeded}</div>
            </div>
        </div>
        
        <div class="sorted-data-display">
            ${formatSortedDataForDisplay(result.data)}
        </div>
    `;
}

/**
 * Calcula estatísticas dos dados ordenados
 */
function calculateSortedDataStatistics(sortedData, originalData) {
    // Verifica se está corretamente ordenado
    let isCorrectlySorted = true;
    for (let i = 1; i < sortedData.length; i++) {
        if (sortedData[i] < sortedData[i-1]) {
            isCorrectlySorted = false;
            break;
        }
    }
    
    // Calcula número de elementos fora de lugar (aproximação simples)
    let swapsNeeded = 0;
    const originalSorted = [...originalData].sort((a, b) => a - b);
    
    for (let i = 0; i < sortedData.length; i++) {
        if (sortedData[i] !== originalSorted[i]) {
            swapsNeeded++;
        }
    }
    
    return {
        isCorrectlySorted,
        swapsNeeded: swapsNeeded === 0 ? 0 : Math.floor(swapsNeeded / 2) // Divisão por 2 pois cada troca afeta 2 elementos
    };
}

/**
 * Formata dados ordenados para exibição
 */
function formatSortedDataForDisplay(data) {
    if (data.length <= 100) {
        // Para arrays pequenos, mostra todos
        return `<strong>Dados completos (${data.length} elementos):</strong><br><br>[${data.join(', ')}]`;
    } else {
        // Para arrays grandes, mostra amostra
        const beginning = data.slice(0, 30);
        const end = data.slice(-30);
        
        return `
            <strong>Amostra dos dados ordenados (${data.length} elementos):</strong><br><br>
            <strong>Primeiros 30:</strong><br>
            [${beginning.join(', ')}]<br><br>
            <strong>... (${data.length - 60} elementos omitidos) ...</strong><br><br>
            <strong>Últimos 30:</strong><br>
            [${end.join(', ')}]
        `;
    }
}

// ========================================
// EVENT LISTENERS E INICIALIZAÇÃO
// ========================================

/**
 * Inicializa a aplicação
 */
document.addEventListener('DOMContentLoaded', function() {
    // Obtém referências dos elementos DOM
    elements.bubbleSortCheck = document.getElementById('bubble-sort');
    elements.mergeSortCheck = document.getElementById('merge-sort');
    elements.quickSortCheck = document.getElementById('quick-sort');
    elements.inputSize = document.getElementById('input-size');
    elements.dataType = document.getElementById('data-type');
    elements.dataSourceRadios = document.querySelectorAll('input[name="data-source"]');
    elements.fileInput = document.getElementById('file-input');
    elements.fileUploadGroup = document.getElementById('file-upload-group');
    elements.runButton = document.getElementById('run-button');
    elements.previewDataButton = document.getElementById('preview-data-button');
    elements.statusMessage = document.getElementById('status-message');
    elements.chartCanvas = document.getElementById('chart-canvas');
    elements.resultsTable = document.getElementById('results-table');
    elements.dataSize = document.getElementById('data-size');
    elements.dataTypeDisplay = document.getElementById('data-type-display');
    elements.dataSourceDisplay = document.getElementById('data-source-display');
    elements.dataPreviewPanel = document.getElementById('data-preview-panel');
    elements.dataDisplay = document.getElementById('data-display');
    elements.showAllDataBtn = document.getElementById('show-all-data');
    elements.showSampleDataBtn = document.getElementById('show-sample-data');
    elements.showStatsDataBtn = document.getElementById('show-stats-data');
    elements.sortedDataPanel = document.getElementById('sorted-data-panel');
    elements.sortedAlgorithmsTabs = document.getElementById('sorted-algorithms-tabs');
    elements.sortedDataContent = document.getElementById('sorted-data-content');
    
    // Event listeners para botões principais
    elements.runButton.addEventListener('click', runAnalysis);
    elements.previewDataButton.addEventListener('click', previewData);
    
    // Event listeners para controles de visualização de dados
    elements.showAllDataBtn.addEventListener('click', showAllData);
    elements.showSampleDataBtn.addEventListener('click', showDataSample);
    elements.showStatsDataBtn.addEventListener('click', showDataStatistics);
    
    // Event listeners para controle de fonte de dados
    elements.dataSourceRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            toggleFileUpload();
            // Reset dos dados carregados quando mudar a fonte
            currentDataset = null;
            sortedResults = {};
            elements.dataPreviewPanel.style.display = 'none';
            elements.sortedDataPanel.style.display = 'none';
        });
    });
    
    // Event listener para mudanças nos parâmetros (reset dos dados)
    elements.inputSize.addEventListener('change', () => {
        currentDataset = null;
        sortedResults = {};
        elements.dataPreviewPanel.style.display = 'none';
        elements.sortedDataPanel.style.display = 'none';
    });
    
    elements.dataType.addEventListener('change', () => {
        currentDataset = null;
        sortedResults = {};
        elements.dataPreviewPanel.style.display = 'none';
        elements.sortedDataPanel.style.display = 'none';
    });
    
    // Inicializa estado da interface
    toggleFileUpload();
    showStatus('Pronto para análise. Configure os parâmetros e clique em "Executar Análise".', '');
    
    console.log('Aplicação de Análise de Algoritmos inicializada com sucesso!');
});
