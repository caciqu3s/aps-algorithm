# Instruções para GitHub Copilot: Projeto de Análise de Algoritmos de Ordenação

Você é o GitHub Copilot. [cite_start]Sua tarefa é me ajudar a implementar uma aplicação web para a "Análise Comparativa de Desempenho de Algoritmos de Ordenação com Visualização Interativa"[cite: 1], com base no plano de pesquisa fornecido.

O objetivo é criar uma ferramenta que:
1.  [cite_start]Implemente os algoritmos **Bubble Sort**, **Merge Sort** e **Quick Sort**[cite: 297].
2.  [cite_start]Permita ao usuário gerar diferentes tipos de conjuntos de dados (aleatórios, ordenados, etc.) ou carregar um arquivo[cite: 47, 311].
3.  [cite_start]Meça o tempo de execução de cada algoritmo usando um método de alta precisão[cite: 348].
4.  [cite_start]Exiba os resultados em um gráfico de barras e em uma tabela[cite: 314, 315, 317].

[cite_start]A pilha de tecnologia deve ser **HTML**, **CSS** e **JavaScript** puro [cite: 287][cite_start], com a biblioteca **Chart.js** para visualização[cite: 361].

## Estrutura do Projeto

[cite_start]Vamos organizar o código em três arquivos principais, conforme sugerido no Apêndice A do plano[cite: 514, 516]:
* `index.html` (Estrutura da UI)
* `style.css` (Estilização)
* `script.js` (Lógica da aplicação)

---

## 1. `index.html` (Estrutura da UI)

Por favor, gere o HTML semântico para a interface do usuário. [cite_start]A UI deve ser dividida em um "Painel de Controle" e uma "Área de Visualização"[cite: 304].

### [cite_start]Painel de Controle [cite: 305]
Crie uma seção `<section id="control-panel">` contendo:
* [cite_start]**Seleção de Algoritmos:** Checkboxes para "Bubble Sort", "Merge Sort" e "Quick Sort"[cite: 307].
* [cite_start]**Tamanho da Entrada:** Um campo `<input type="number">` (id: `input-size`) para definir o número de elementos[cite: 309].
* [cite_start]**Estado Inicial dos Dados:** Um menu suspenso `<select>` (id: `data-type`) com as opções[cite: 310]:
    * [cite_start]Aleatório [cite: 390]
    * [cite_start]Ordenado [cite: 392]
    * [cite_start]Inversamente Ordenado [cite: 393]
    * [cite_start]Quase Ordenado [cite: 395]
* [cite_start]**Fonte dos Dados:** Botões de rádio (`<input type="radio">`) para "Gerar Dados Internos" e "Carregar de Arquivo Externo"[cite: 311].
* [cite_start]**Upload de Arquivo:** Um campo `<input type="file">` (id: `file-input`) que fica visível apenas se "Carregar de Arquivo" for selecionado[cite: 332].
* [cite_start]**Controle de Execução:** Um botão principal `<button id="run-button">` com o texto "Executar Análise"[cite: 313].

### [cite_start]Área de Visualização [cite: 314]
Crie uma seção `<section id="visualization-area">` contendo:
* [cite_start]**Gráfico:** Um elemento `<canvas id="chart-canvas">` para o gráfico de barras do Chart.js[cite: 315, 368].
* [cite_start]**Tabela de Resultados:** Uma `<table>` (id: `results-table`) com cabeçalhos para "Algoritmo" e "Tempo de Execução (ms)"[cite: 317].

Finalmente, vincule os arquivos `style.css` e `script.js` (use `defer` para o script).

---

## 2. `style.css` (Estilização)

[cite_start]Gere o CSS para um layout limpo e intuitivo[cite: 293].
* Use **CSS Grid** ou **Flexbox** para dividir a tela principal em duas colunas (Painel de Controle à esquerda, Área de Visualização à direita).
* Estilize os elementos do formulário no painel de controle para que fiquem organizados e fáceis de usar.
* Garanta que a tabela de resultados seja legível.
* Faça o canvas do gráfico ser responsivo dentro de seu contêiner.

---

## 3. `script.js` (Lógica da Aplicação)

Este é o arquivo principal. Vamos dividi-lo em seções:

### 3.1. Referências do DOM e Event Listeners
* Obtenha referências para todos os elementos interativos do `index.html` (botões, inputs, select, canvas, tabela).
* [cite_start]Adicione um `click` listener ao botão "Executar Análise" [cite: 313] que chamará uma função principal `runAnalysis()`.

### 3.2. [cite_start]Funções de Geração de Dados [cite: 321]
Crie funções auxiliares para gerar os arrays com base na seleção do usuário:
* [cite_start]`generateRandomArray(size)`: Deve usar `Math.random()`[cite: 326].
* [cite_start]`generateSortedArray(size)`: Deve gerar `[1, 2, 3, ..., n]`[cite: 326].
* [cite_start]`generateReversedArray(size)`: Deve gerar `[n, n-1, ..., 1]`[cite: 327].
* [cite_start]`generateAlmostSortedArray(size)`: Gere um array ordenado e, em seguida, realize um pequeno número de trocas aleatórias (ex: 10% do tamanho)[cite: 328, 329, 395].

### 3.3. [cite_start]Lógica de Carregamento de Arquivo [cite: 331]
* Implemente a lógica para o `<input type="file">`.
* [cite_start]Use a **`File API`** e um **`FileReader`** [cite: 332, 333] para ler o conteúdo do arquivo de texto.
* [cite_start]Quando a leitura for concluída, processe a string (que pode ter números separados por vírgula ou quebra de linha) e converta-a em um array de números[cite: 334].

### 3.4. [cite_start]Implementação dos Algoritmos de Ordenação [cite: 337]

**a) `bubbleSort(arr)`**
* [cite_start]Implemente a versão com dois loops aninhados[cite: 338].
* **Importante:** Adicione a otimização da flag `trocou` (ou `swapped`). [cite_start]Se um loop interno for concluído sem nenhuma troca, o algoritmo deve parar[cite: 110]. Isso é crucial para demonstrar o melhor caso `O(n)`.

**b) `mergeSort(arr)`**
* [cite_start]Implemente recursivamente seguindo o paradigma "dividir para conquistar"[cite: 120, 340].
* [cite_start]A função principal `mergeSort` deve dividir o array até o caso base[cite: 340].
* [cite_start]Crie uma função auxiliar `merge(left, right)` que intercala dois arrays ordenados[cite: 341].
* [cite_start]Este algoritmo é **"out-of-place"** e exigirá um array auxiliar para a intercalação[cite: 192, 193].

**c) `quickSort(arr)`**
* [cite_start]Implemente recursivamente[cite: 343].
* [cite_start]Crie uma função auxiliar `partition(arr, low, high)`[cite: 344].
* [cite_start]Conforme especificado no plano de pesquisa (para fins de demonstração do pior caso), use o **último elemento** do subarray como pivô[cite: 343, 237].
* [cite_start]O particionamento deve ser feito **"in-place"**[cite: 263].

### 3.5. Medição de Desempenho (Função `runAnalysis()`)
Esta é a função principal chamada pelo botão.
1.  Obtenha os parâmetros da UI (algoritmos selecionados, tamanho, tipo de dados).
2.  Gere ou carregue o array de dados original.
3.  Crie um loop pelos algoritmos selecionados.
4.  **Para cada algoritmo:**
    * Crie uma **cópia** do array original (para que cada algoritmo ordene os mesmos dados).
    * [cite_start]**Medição de Tempo:** Use `performance.now()` para medir o tempo de execução[cite: 348]. [cite_start]Este método é preferível ao `Date.now()` por sua alta precisão de microssegundos e natureza monotônica[cite: 354, 355, 356].
    * [cite_start]Capture `const t0 = performance.now();`[cite: 351].
    * Execute a função de ordenação (ex: `bubbleSort(arrayCopy)`).
    * [cite_start]Capture `const t1 = performance.now();`[cite: 352].
    * [cite_start]Calcule o tempo total: `const executionTime = t1 - t0;`[cite: 353].
    * Armazene o resultado (nome do algoritmo e `executionTime`).
5.  Após o loop, chame as funções para atualizar a UI com os resultados.

### 3.6. [cite_start]Visualização dos Resultados [cite: 359]
Crie duas funções para exibir os dados coletados:

**a) `renderChart(results)`**
* [cite_start]Use a biblioteca **Chart.js**[cite: 361].
* [cite_start]Obtenha o contexto 2D do `<canvas id="chart-canvas">`[cite: 368].
* **Importante:** Verifique se uma instância de gráfico anterior existe. Se sim, chame o método `.destroy()` nela antes de criar uma nova. [cite_start]Isso evita sobreposição e problemas de memória[cite: 370].
* [cite_start]Crie um `new Chart(...)` com `type: 'bar'`[cite: 369].
* [cite_start]Preencha o objeto `data`[cite: 369]:
    * `labels`: um array com os nomes dos algoritmos (ex: `['Bubble Sort', 'Quick Sort']`).
    * `datasets`: um array contendo um objeto com os tempos de execução (ex: `[{ label: 'Tempo (ms)', data: [120.5, 0.8] }]`).

**b) `updateTable(results)`**
* Limpe quaisquer linhas anteriores da `<tbody>` da tabela de resultados.
* Faça um loop pelos `results` e adicione uma nova linha (`<tr>`) para cada algoritmo, com seu nome e tempo de execução formatado.