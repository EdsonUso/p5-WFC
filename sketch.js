//Criando um array para os blocos de texturas, ou comumente chamado dentro do desenvolvimento de jogos: tiles
const tiles = [];
const tilesImages = [];

//Um array para receber a posições das celulas e suas caracteristicas já dentro da grid
let grid = [];

//Definição da dimensão da grid
const DIM = 40;

//Variaveis numericas que representam as possibilidades de celulas
const BLANK = 0;
const UP = 1;
const RIGHT = 2;
const DOWN = 3;
const LEFT = 4;
//Função para filtrar e manter somente as posições validas
function checkValid(arr, valid) {
  //Valido: [BLANK, RIGHT],
  //ARR: [BLANK, UP, DOWN, LEFT],
  //resultara na remoção de UP, DOWN, LEFT
  for (let i = arr.length - 1; i >= 0; i--) {
    let element = arr[i];

    if (!valid.includes(element)) {
      arr.splice(i, 1);
    }
  }
}
//Regras de conexões entre as possibilidades

//Carregando imagem dos tiles dentro do array
function preload() {
  for (let i = 0; i <= 13; i++) {
    tilesImages[i] = loadImage(`./tiles/circuit/${i}.png`);
    console.log(i);
  }
}

function setup() {
  createCanvas(800, 800);

  tiles[0] = new Tile(tilesImages[0], ["AAA", "AAA", "AAA", "AAA"]);
  tiles[1] = new Tile(tilesImages[1], ["BBB", "BBB", "BBB", "BBB"]);
  tiles[2] = new Tile(tilesImages[2], ["BCB", "BBB", "BBB", "BBB"]);
  tiles[3] = new Tile(tilesImages[3], ["BBB", "BDB", "BBB", "BDB"]);
  tiles[4] = new Tile(tilesImages[4], ["BCB", "BBA", "AAA", "ABB"]);
  tiles[5] = new Tile(tilesImages[5], ["BBB", "BBB", "BBA", "ABB"]);
  tiles[6] = new Tile(tilesImages[6], ["BCB", "BBB", "BCB", "BBB"]);
  tiles[7] = new Tile(tilesImages[7], ["BCB", "BDB", "BCB", "BDB"]);
  tiles[8] = new Tile(tilesImages[8], ["BDB", "BBB", "BCB", "BBB"]);
  tiles[9] = new Tile(tilesImages[9], ["BBB", "BCB", "BCB", "BCB"]);
  tiles[10] = new Tile(tilesImages[10], ["BCB", "BCB", "BCB", "BCB"]);
  tiles[11] = new Tile(tilesImages[11], ["BCB", "BCB", "BBB", "BBB"]);
  tiles[12] = new Tile(tilesImages[12], ["BBB", "BCB", "BBB", "BCB"]);
  tiles[13] = new Tile(tilesImages[13], ["BCB", "BCB", "BBB", "BBB"]);

  for (let i = 2; i < 12; i++) {
    for (let j = 1; j < 4; j++) {
      tiles.push(tiles[i].rotate(j));
    }
  }

  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    tile.analyze(tiles);
  }

  startOver();
}

function startOver() {
  for (let i = 0; i < DIM * DIM; i++) {
    grid[i] = new Cell(tiles.length);
  }
}

//Desenhando grid
function draw() {
  //Escolhendo a celula com menor entropia
  /*
        Entropia basicamente é a possibilidade de posições, quanto mais possibilidades a celula tem mais entropia "caos" ela tem
        É necessario capturar a celula com menos possibilidades de posições para reduzir a chance de um fim distopico
    */

  //Criando uma copia do array e selecionando somente as celulas com maior entropia
  let gridCopy = grid.slice();
  gridCopy = gridCopy.filter((a) => !a.collapsed);

  if (gridCopy.length == 0) {
    return;
  }

  background(0);

  gridCopy.sort((a, b) => {
    return a.options.length - b.options.length;
  });
  console.table(gridCopy);

  let len = gridCopy[0].options.length;
  let stopIndex = 0;
  for (let i = 1; i < gridCopy.length; i++) {
    if (gridCopy[i].options.length > len) {
      stopIndex = i;
      break;
    }
  }

  if (stopIndex > 0) gridCopy.splice(stopIndex);
  const cell = random(gridCopy);
  cell.collapsed = true;
  const pick = random(cell.options);

  if (pick  === undefined) {
    startOver();
    return;
  }
  cell.options = [pick];

  const w = width / DIM;
  const h = height / DIM;
  for (let j = 0; j < DIM; j++) {
    for (let i = 0; i < DIM; i++) {
      let cell = grid[i + j * DIM];
      if (cell.collapsed) {
        let index = cell.options[0];
        image(tiles[index].img, i * w, j * h, w, h);
      } else {
        fill(0);
        stroke(255);
        rect(i * w, j * w, w, h);
      }
    }
  }

  const nextGrid = [];
  for (let j = 0; j < DIM; j++) {
    for (let i = 0; i < DIM; i++) {
      let index = i + j * DIM;
      if (grid[index].collapsed) {
        nextGrid[index] = grid[index];
      } else {
        let options = new Array(tiles.length).fill(0).map((x, i) => i);

        if (j > 0) {
          //Olhando para cima
          let up = grid[i + (j - 1) * DIM];
          let validOptions = [];
          for (let option of up.options) {
            let valid = tiles[option].down; //Aqui a celula será contruida abaixo da que está sendo analisada, ou seja
            //Se espera as regras de validação para a posição abaixo dela, que dentro do array no objeto rules é de index 2
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }

        //Olhando para direita
        if (i < DIM - 1) {
          let right = grid[i + 1 + j * DIM];
          let validOptions = [];
          for (let option of right.options) {
            let valid = tiles[option].left;

            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }

        //Olhando para baixo
        if (j < DIM - 1) {
          let down = grid[i + (j + 1) * DIM];
          let validOptions = [];
          for (let option of down.options) {
            let valid = tiles[option].up;

            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }

        //Olhando para esquerda
        if (i > 0) {
          let left = grid[i - 1 + j * DIM];
          let validOptions = [];
          for (let option of left.options) {
            let valid = tiles[option].right;

            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }

        nextGrid[index] = new Cell(options);
      }
    }
  }
  grid = nextGrid;
}
