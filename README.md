# Análise Comparativa de Desempenho de Algoritmos de Ordenação

Uma aplicação web interativa para comparar o desempenho dos algoritmos **Bubble Sort**, **Merge Sort** e **Quick Sort** com visualização em tempo real dos resultados.

## 🚀 Características

- **Interface Intuitiva**: Design responsivo com painel de controle e área de visualização
- **Algoritmos Implementados**:
  - **Bubble Sort**: Com otimização early-stopping (melhor caso O(n))
  - **Merge Sort**: Implementação recursiva dividir-para-conquistar
  - **Quick Sort**: Com último elemento como pivô
- **Tipos de Dados**: Aleatório, Ordenado, Inversamente Ordenado, Quase Ordenado
- **Carregamento de Arquivo**: Suporte a arquivos externos (.txt, .csv)
- **Medição Precisa**: Utiliza `performance.now()` para alta precisão temporal
- **Visualização**: Gráfico de barras interativo com Chart.js e tabela detalhada

## 📋 Funcionalidades

### Painel de Controle

- ✅ Seleção múltipla de algoritmos
- ✅ Configuração do tamanho da entrada (10 - 10.000 elementos)
- ✅ Escolha do estado inicial dos dados
- ✅ Opção de carregar dados de arquivo externo
- ✅ **👁️ Visualização dos dados** - Novo botão para inspecionar os dados antes da análise
- ✅ Validação de entrada e feedback de status

### Área de Visualização

- 📊 Gráfico de barras interativo com Chart.js
- 📋 Tabela com resultados detalhados
- 📊 **Painel de visualização de dados** com três modos:
  - **Mostrar Todos**: Exibe todos os números da lista
  - **Amostra (50)**: Mostra primeiros 25 e últimos 25 elementos
  - **Estatísticas**: Análise completa dos dados (min, max, média, mediana, etc.)
- ℹ️ Painel de informações do conjunto de dados
- 🎯 Indicação de complexidade e tipo de algoritmo

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica da aplicação
- **CSS3**: Design responsivo com CSS Grid e Flexbox
- **JavaScript ES6+**: Lógica da aplicação e algoritmos
- **Chart.js**: Biblioteca para visualização de dados
- **Performance API**: Medição precisa de tempo de execução

## 📖 Como Usar

### 1. Executar Localmente

```bash
# Clone ou baixe o projeto
cd aps-algorithm

# Inicie um servidor HTTP local
python3 -m http.server 8000

# Acesse no navegador
http://localhost:8000
```

### 2. Interface da Aplicação

1. **Selecione os Algoritmos**: Marque os algoritmos que deseja comparar
2. **Configure o Tamanho**: Digite o número de elementos (10 - 10.000)
3. **Escolha o Tipo de Dados**:
   - **Aleatório**: Dados embaralhados
   - **Ordenado**: Melhor caso para algoritmos otimizados
   - **Inversamente Ordenado**: Pior caso para muitos algoritmos
   - **Quase Ordenado**: Cenário comum em aplicações reais
4. **Fonte dos Dados**: Use geração interna ou carregue um arquivo
5. **👁️ Visualize os Dados**: (Opcional) Clique em "Visualizar Dados" para inspecionar os números
6. **Execute**: Clique em "Executar Análise" e veja os resultados

### 3. Formato de Arquivo

Para carregar dados externos, use arquivos de texto com números separados por:

- Vírgulas: `1,2,3,4,5`
- Quebras de linha:

  ```text
  1
  2
  3
  4
  5
  ```

- Espaços: `1 2 3 4 5`

## 🔬 Detalhes dos Algoritmos

### Bubble Sort

- **Complexidade**: O(n) melhor caso, O(n²) caso médio/pior
- **Otimização**: Early-stopping quando não há trocas
- **Tipo**: Algoritmo de comparação in-place

### Merge Sort

- **Complexidade**: O(n log n) em todos os casos
- **Tipo**: Dividir-para-conquistar, out-of-place
- **Estabilidade**: Algoritmo estável

### Quick Sort

- **Complexidade**: O(n log n) melhor/médio caso, O(n²) pior caso
- **Pivô**: Último elemento do subarray
- **Tipo**: Dividir-para-conquistar, in-place

## 📊 Interpretação dos Resultados

- **Gráfico de Barras**: Visualização comparativa dos tempos de execução
- **Tabela de Resultados**: Detalhes precisos com complexidade e tipo
- **Informações do Dataset**: Tamanho, tipo e origem dos dados
- **Visualização dos Dados**: Inspeção detalhada dos números e estatísticas

### Cenários Típicos

1. **Dados Aleatórios**: Quick Sort e Merge Sort geralmente superam Bubble Sort
2. **Dados Ordenados**: Bubble Sort otimizado pode ser o mais rápido (O(n))
3. **Dados Invertidos**: Bubble Sort apresenta pior desempenho (O(n²))
4. **Dados Grandes**: Merge Sort mantém consistência O(n log n)

## 🎯 Casos de Uso Educacionais

- **Ensino de Algoritmos**: Visualização prática de complexidade temporal
- **Análise Comparativa**: Demonstração de diferentes paradigmas
- **Estudo de Casos**: Impacto do estado inicial nos algoritmos
- **Pesquisa**: Coleta de dados empíricos sobre desempenho

## 📁 Estrutura do Projeto

```text
aps-algorithm/
├── index.html          # Estrutura da interface
├── style.css           # Estilos e layout responsivo
├── script.js           # Lógica e algoritmos
├── README.md           # Documentação
└── copilot-instructions.md  # Especificações do projeto
```

## 🔍 Considerações Técnicas

### Medição de Desempenho

- Utiliza `performance.now()` para precisão de microssegundos
- Evita interferência do garbage collector
- Cria cópias independentes dos dados para cada algoritmo

### Otimizações

- Bubble Sort com flag de early-stopping
- Quick Sort com particionamento in-place
- Merge Sort com arrays auxiliares otimizados

### Responsividade

- Layout adaptável para diferentes tamanhos de tela
- Gráficos redimensionáveis
- Interface touch-friendly para dispositivos móveis

## 🤝 Contribuições

Este projeto foi desenvolvido como uma ferramenta educacional para análise de algoritmos de ordenação. Sugestões e melhorias são bem-vindas!

## 📄 Licença

Projeto desenvolvido para fins educacionais e de pesquisa.

---

Desenvolvido com ❤️ para ensino e análise de algoritmos de ordenação
