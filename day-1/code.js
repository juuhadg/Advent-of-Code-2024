
    const input = require('fs').readFileSync('./day-1/input.txt', 'utf-8');
    //const input = require('fs').readFileSync('./day-1/example.txt', 'utf-8');

    function part1(input) {
        const nums = input.split('\n');
        let firstNums = []
        let lastNums = []
    
        for(const line of nums) {
            firstNums.push(Number(line.split('   ')[0]))
            lastNums.push(Number(line.split('   ')[1]))
        }
        firstNums.sort((a, b) => a - b)
        lastNums.sort((a, b) => a - b)
    
        let count = 0
        for(let i = 0; i < firstNums.length; i++) {
    
                let diff = firstNums[i] - lastNums[i]
                if(diff < 0) diff = -diff;
                count+= diff
            
        }
        return count
    }
   
    function part2(input) {
        const nums = input.split('\n');
        let firstNums = []
        let lastNums = []
        let numberCounterLastRow = {}
        let count = 0
        for(const line of nums) {
            firstNums.push(Number(line.split('   ')[0]))
            let lastNumber = Number(line.split('   ')[1])
            lastNums.push(lastNumber)
            if(!numberCounterLastRow[lastNumber]) numberCounterLastRow[lastNumber] = 1
            else numberCounterLastRow[lastNumber]++
        }
        for(let i = 0; i < firstNums.length; i++) {
                let numbersInLastRow = numberCounterLastRow[firstNums[i]] || 0
                count += firstNums[i] * numbersInLastRow
            
        }
        return count
    }

    console.log(part1(input))
    console.log(part2(input))