
//Criando um array para os blocos de texturas, ou comumente chamado dentro do desenvolvimento de jogos: tiles
const tiles = [];

//Um array para receber a posições das celulas e suas caracteristicas já dentro da grid
let grid = [];

//Definição da dimensão da grid
const DIM = 8;

//Variaveis numericas que representam as possibilidades de celulas
const BLANK = 0;
const UP = 1;
const RIGHT = 2;
const DOWN = 3;
const LEFT = 4;

//Função para filtrar e manter somente as posições validas
function checkValid(arr, valid){

    //Valido: [BLANK, RIGHT],
    //ARR: [BLANK, UP, DOWN, LEFT],
    //resultara na remoção de UP, DOWN, LEFT
    for(let i = arr.length -1; i >= 0;i--){
        let element = arr[i]

        if(!valid.includes(element)) {
            arr.splice(i, 1)
        }
    }
}

function mousePressed() {
    redraw();
}



//Regras de conexões entre as possibilidades
const rules = [
   [
        [BLANK, UP],
        [BLANK, RIGHT],
        [BLANK, DOWN],
        [BLANK, LEFT]
    ],

    [
        [RIGHT, LEFT, DOWN],
        [LEFT, UP, DOWN],
        [BLANK, DOWN],
        [RIGHT, UP, DOWN]

    ],

    [
        [RIGHT, LEFT, DOWN],
        [LEFT, UP, DOWN],
        [RIGHT, LEFT, UP],
        [BLANK, LEFT]
    ],

    [
        [BLANK, UP],
        [LEFT, UP, DOWN],
        [RIGHT, LEFT, UP],
        [RIGHT, UP, DOWN]
    ],

    [
        [RIGHT, LEFT, DOWN],
        [BLANK, RIGHT],
        [RIGHT, LEFT, UP],
        [UP, DOWN, RIGHT]
    ],
]



//Carregando imagem dos tiles dentro do array
function preload() {
  tiles[0] = loadImage("./tiles/blank.png");
  tiles[1] = loadImage("./tiles/up.png");
  tiles[2] = loadImage("./tiles/right.png");
  tiles[3] = loadImage("./tiles/down.png");
  tiles[4] = loadImage("./tiles/left.png");
}

function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < DIM * DIM; i++) {
    grid[i] = {
      collapsed: false,
      options: [BLANK, UP, RIGHT, DOWN, LEFT],
    };
  }
}

//Desenhando grid
function draw() {
  background(0);


    //Escolhendo a celula com menor entropia
    /*
        Entropia basicamente é a possibilidade de posições, quanto mais possibilidades a celula tem mais entropia "caos" ela tem
        É necessario capturar a celula com menos possibilidades de posições para reduzir a chance de um fim distopico
    */ 

    //Criando uma copia do array e selecionando somente as celulas com maior entropia
    let gridCopy = grid.slice();
    gridCopy = gridCopy.filter((a) => !a.collapsed)
    

    gridCopy.sort( (a,b) => {
        return a.options.length - b.options.length;
    })
    console.table(gridCopy)

    let len = gridCopy[0].options.length;
    let stopIndex = 0;
    for (let i = 1; i < gridCopy.length; i++) {
        if (gridCopy[i].options.length > len) {
            stopIndex = i;
            break;
        }
    }

    if(stopIndex > 0) gridCopy.splice(stopIndex)
    const cell = random(gridCopy);
    cell.collapsed = true;
    const pick = random(cell.options)
    cell.options = [pick]

  const w = width / DIM;
  const h = height / DIM;
  for (let j = 0; j < DIM; j++) {
    for (let i = 0; i < DIM; i++) {
      let cell = grid[i + j * DIM];
      if (cell.collapsed) {
        let index = cell.options[0];
        image(tiles[index], i * w, j * h, w, h);
      } else {
        fill(0);
        stroke(255);
        rect(i * w, j * w, w, h);
      }
    }
  }

  const nextGrid = []
  for(let j = 0; j < DIM; j++){
    for(let i = 0; i < DIM; i++){
        let index = i + j * DIM;
        if(grid[index].collapsed) {
            nextGrid[index] = grid[index];
        }else {
            let options = [BLANK, UP, RIGHT, DOWN, LEFT]

            if(j > 0){
                
                //Olhando para cima
                let up = grid[i + (j -1) * DIM]
                let validOptions = []
                for(let option of up.options) {
                    let valid = rules[option][2] //Aqui a celula será contruida abaixo da que está sendo analisada, ou seja
                    //Se espera as regras de validação para a posição abaixo dela, que dentro do array no objeto rules é de index 2
                    validOptions = validOptions.concat(valid)
                }
                checkValid(options, validOptions)
            }
            

            //Olhando para direita
            if (i < DIM - 1){
                let right = grid[i + 1 + j * DIM]
                let validOptions = []
                for(let option of right.options){
                    let valid = rules[option][3];

                    validOptions = validOptions.concat(valid)
                }
                checkValid(options, validOptions)
            }
            

             //Olhando para baixo
             if (j < DIM - 1){
                let down = grid[i + (j + 1) * DIM]
                let validOptions = []
                for(let option of down.options){
                    let valid = rules[option][0];

                    validOptions = validOptions.concat(valid)
                }
                checkValid(options, validOptions)
            }
            

            //Olhando para esquerda
            if (i > 0){
                let left = grid[i - 1 + j * DIM]
                let validOptions = []
                for(let option of left.options){
                    let valid = rules[option][1];

                    validOptions = validOptions.concat(valid)
                }
                checkValid(options, validOptions)
            }
            

            nextGrid[index] = {
                options, 
                collapsed: false
            }
        }
    }
  }
  grid = nextGrid;
  noLoop();
}
