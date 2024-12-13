//const input = require('fs').readFileSync('./day-5/example.txt', 'utf-8');
const input = require('fs').readFileSync('./day-5/input.txt', 'utf-8');

let rules = input.split(/\n\s*\n/)[0].split("\n")
let updates = input.split(/\n\s*\n/)[1].split("\n")

function part1() {
let res = 0;

for(const update of updates) {
    let valid = true;
    let numbers = update.trim().split(',')
    for(let rule of rules) {
        let n1 = rule.trim().split('|')[0]
        let n2 = rule.trim().split('|')[1]

        if(numbers.includes(n1) && numbers.includes(n2)) { 
            if(numbers.findIndex(n=>n === n1) > numbers.findIndex(n=> n=== n2)) {
                valid = false;
                break;
            }
        }
    }
    
    if (valid) res+=Number(numbers[(numbers.length -1) / 2])
    


}

console.log(res)
}

function part2() {
    let res = 0;

    for(const update of updates) {
        let valid = true;
        let numbers = update.trim().split(',')
        for(let i = 0; i < rules.length; i++) {
            let rule = rules[i]
            let n1 = rule.trim().split('|')[0]
            let n2 = rule.trim().split('|')[1]
    
            if(numbers.includes(n1) && numbers.includes(n2)) {
                if(numbers.findIndex(n=>n === n1) > numbers.findIndex(n=> n=== n2)) {
                    valid = false;
                    let idx1 = numbers.findIndex(n=>n === n1)
                    let idx2 = numbers.findIndex(n=>n === n2)
                    numbers[idx1] = n2
                    numbers[idx2] = n1
                    i = 0;
                }
            }
        }
        
        if (!valid) res += Number(numbers[(numbers.length -1) / 2])
        
    
    
    }
    
    console.log(res)
}
part1()
part2()