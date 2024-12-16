const input = require('fs').readFileSync('./day-6/example.txt', 'utf-8');
//const input = require('fs').readFileSync('./day-6/input.txt', 'utf-8');

const lines = input.split("\n");
let newInput = [];

for( let line of lines ) {
    newInput.push(line.trim().split(""))
}
const startLine = newInput.findIndex(line => line.some(char => char !== "." && char !== "#"));
const startPosition = newInput[startLine].findIndex(char => char !== "#" && char !== ".");

var currentPositions = {
    line : startLine,
    position : startPosition
}


async function part1() {

    let direction;
   switch(newInput[startLine][startPosition]) {
       case ">":
           direction = "right";
           break;
       case "v":
           direction = "down";
           break;
       case "<":
           direction = "left";
           break;
       case "^":
           direction = "up";
           break;
   }
    while(!walkingOutOfBoundaries(direction,currentPositions.line,currentPositions.position)) {
        printMatrix(newInput, currentPositions);
        direction = walk(direction,currentPositions)
        await sleep(200);
    }

    newInput[newInput.length-1][newInput[0].length-3] = "v"
    printMatrix(newInput, currentPositions);

    let res = 0;

    for( const line of newInput) {
        for(const char of line) {
            if (char === "X") res++;
        }
    }
res = res+1
console.log(`${res} Passos Dados Ao Total !!!`)
}


function walkingOutOfBoundaries(direction,currentLine,currentPosition) {
    if(direction === "up") {
        return currentLine === 0;
    }

    if(direction === "down") {
        return currentLine === newInput.length - 1
    }

    if(direction === "right") {
        return currentPosition === newInput[0].length - 1
    }

    if(direction === "left") {
        return currentPosition === 0;
    }
}


function walk(direction,currentPositions) {
    if(direction === "up") {
        let lineToWalk = currentPositions.line - 1;
        if(newInput[lineToWalk][currentPositions.position] !== "#") {
            newInput[currentPositions.line][currentPositions.position] = "X"
            newInput[lineToWalk][currentPositions.position] = "^"
            currentPositions.line = lineToWalk;
            return direction;
        } else {
            newInput[currentPositions.line][currentPositions.position] = ">"
            return "right";
        }
    }


    if(direction === "right") {
        let positionToWalk = currentPositions.position + 1;
        if(newInput[currentPositions.line][positionToWalk] !== "#") {
            newInput[currentPositions.line][currentPositions.position] = "X"
            newInput[currentPositions.line][positionToWalk] = ">"
            currentPositions.position = positionToWalk;
            return direction;
        } else {
            newInput[currentPositions.line][currentPositions.position] = "v"
            return "down";
        }

    }

    if(direction === "down") {
        let lineToWalk = currentPositions.line + 1;
        if(newInput[lineToWalk][currentPositions.position] !== "#") {
            newInput[currentPositions.line][currentPositions.position] = "X"
            newInput[lineToWalk][currentPositions.position] = "v"
            currentPositions.line = lineToWalk;
            return direction;
        } else {
            newInput[currentPositions.line][currentPositions.position] = "<"
            return "left";
        }
    }

    if(direction === "left") {
        let positionToWalk = currentPositions.position - 1;
        if(newInput[currentPositions.line][positionToWalk] !== "#") {
            newInput[currentPositions.line][currentPositions.position] = "X"
            newInput[currentPositions.line][positionToWalk] = "<"
            currentPositions.position = positionToWalk;
            return direction;
        } else {
            newInput[currentPositions.line][currentPositions.position] = "^"
            return "up";
        }

    }

}

function printMatrix(matrix, currentPositions) {

    console.clear(); // Limpa o terminal
    console.log(matrix.map(row => row.join(" ")).join("\n")); // Imprime a matriz
    console.log("\nLegenda: '>' é o ponteiro, 'X' são os passos marcados.");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

part1()