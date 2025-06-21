# p5-WFC
Este repositorio contém um script de Wave Function Collapse utilizando a biblioteca p5 para renderização

Este é um pequeno projeto experimental que implementa uma **versão simplificada do algoritmo Wave Function Collapse (WFC)** utilizando **JavaScript** e a biblioteca gráfica **p5.js**. O objetivo principal é **entender os conceitos básicos** por trás do algoritmo de WFC por meio de uma implementação didática, **seguindo os ensinamentos do canal The Coding Train**, por Daniel Shiffman.

---

## Wave Function Collapse?

**Wave Function Collapse** (WFC) é um algoritmo procedural de geração de conteúdo, inspirado pela **mecânica quântica** e pela **entropia**. Seu uso mais comum é na **geração de mapas ou padrões gráficos coerentes** com base em um conjunto de regras e tiles (blocos). 

O WFC parte da ideia de que cada célula do grid pode conter múltiplos estados possíveis, e à medida que o algoritmo "colapsa" células, ele restringe as possibilidades das células vizinhas de acordo com regras de compatibilidade. Isso é similar ao comportamento de partículas quânticas até serem observadas — daí o nome.

---

## Objetivo do Projeto

O objetivo deste projeto é:

- Aprender e entender os fundamentos do algoritmo Wave Function Collapse.
- Visualizar o processo de colapso de possibilidades usando a biblioteca **p5.js**.
- Implementar uma **versão básica e acessível** do WFC para fins educativos.
- Explorar conceitos como **colapso de entropia**, **propagação de restrições** e **tiles compatíveis**.

---

## Teoria por Trás do WFC (Resumida)

1. **Grid Inicial**: Um tabuleiro (grid) é criado onde cada célula começa com todas as possibilidades (todos os tiles possíveis), ou seja uma superposição completa, entropia maxima.
2. **Colapso**: Escolhe-se uma célula com menor entropia (menos possibilidades) e colapsa-se ela em um único estado (tile). a celula atinge a "superposição de algo"
3. **Propagação**: A partir desse colapso, propagam-se as restrições para as células vizinhas, removendo estados incompatíveis, a entropia das celulas proximas diminuem, as possibilidades são menores
4. **Repetição**: O processo se repete até que todas as células tenham colapsado para um único estado, formando um padrão coerente.

---

## Sobre esta Implementação

- **Linguagem**: JavaScript
- **Biblioteca**: p5.js
- **Tipo**: Implementação **didática e simplificada**
- **Fonte de Estudo**: [The Coding Train - Wave Function Collapse](https://www.youtube.com/watch?v=rI_y2GAlQFM)

> Este projeto **não é uma implementação completa** do algoritmo original utilizado em jogos ou aplicações comerciais, mas sim uma versão reduzida ideal para aprendizado.

---

## Como Executar

1. Clone o repositório ou baixe os arquivos.
2. Inicie o arquivo index.html em um servidor local(por facilidade recomendo utilizar a extensão Live Server que pode ser instalada dentro do VSCODE)
3. Veja o algoritmo colapsar os tiles em tempo real, atualize a pagina para ver a randomização

---

## Créditos

Este projeto foi desenvolvido como exercício de aprendizado com base na série de vídeos de:

- **Daniel Shiffman - The Coding Train**
  - YouTube: [https://www.youtube.com/c/TheCodingTrain](https://www.youtube.com/c/TheCodingTrain)

---

## Observações

- O código foi intencionalmente mantido simples e comentado.
- Ideal para quem está começando com algoritmos de geração procedural e p5.js.
- Se for util para você fique a vontade de utilizar da forma que quiser

---

