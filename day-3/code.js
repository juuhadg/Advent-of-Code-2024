//const input = require('fs').readFileSync('./day-3/example.txt', 'utf-8');
const input = require('fs').readFileSync('./day-3/input.txt', 'utf-8');
//const input = require('fs').readFileSync('./day-3/example-2.txt', 'utf-8');


function part1() {
    const regex = /mul\(\d+,\d+\)/g;
const matches = [...input.matchAll(regex)];
let sum = 0;


for(const match of matches) { 
let numbers = match[0].split("(")[1].replace(")","").split(',');
sum+= numbers[0] * numbers[1]
}

console.log(sum)

}




function part2() {
    const regex = /mul\(\d+,\d+\)/g;
    const regexDo = /do\(\)/g;
    const regexDont = /don't\(\)/g;

const matches = [...input.matchAll(regex)];
const doMatches = [...input.matchAll(regexDo)]
const dontMatches = [...input.matchAll(regexDont)]
let sum = 0;

for(const match of matches) { 
let numbers = match[0].split("(")[1].replace(")","").split(',');
if(isMulEnabled(doMatches,dontMatches, match.index, match.index + match[0].length - 1)) {
    sum+= Number(numbers[0]) * Number(numbers[1])

}
}

console.log(sum)
}

function isMulEnabled(dos,donts,startIdx,endIdx) {
    if(endIdx < donts[0].index) return true;

    let mostRecentDoInstruction = dos.filter(d=>d.index + d[0].length - 1 < startIdx)
    let mostRecentDontInstruction = donts.filter(d=>d.index + d[0].length - 1 < startIdx)

    mostRecentDoInstruction = mostRecentDoInstruction[mostRecentDoInstruction.length - 1]
    mostRecentDontInstruction = mostRecentDontInstruction[mostRecentDontInstruction.length - 1]

    let doIdx = mostRecentDoInstruction?.index || -1
    let dontIdx = mostRecentDontInstruction?.index || -1

    let instructionToUse = doIdx > dontIdx ? mostRecentDoInstruction : mostRecentDontInstruction
    return instructionToUse[0] == "do()"

}
part1()
part2()