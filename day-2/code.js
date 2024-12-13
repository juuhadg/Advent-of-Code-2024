//const input = require('fs').readFileSync('./day-2/example.txt', 'utf-8');
const input = require('fs').readFileSync('./day-2/input.txt', 'utf-8');





function part1(input) {
    const reports = input.split('\n');
    let safeCount = 0;
for (const report of reports) { 
    let safe = true;
    const numbers = report.replace('\r','').split(' ');

    let mode = Number(numbers[0]) < Number(numbers[1]) ? "increasing" : "decreasing"

   for(let i=0;i<=numbers.length -1;i++) {
    if(i == 0) {
        continue;
    }
    let sum = Number(numbers[i]) - Number(numbers[i-1]);
    let diff = sum > 0 ? sum : -sum;

    if(diff < 1 || diff > 3) {
        safe = false;
        break;
    }

    if(mode === "increasing") {
        if (sum < 0) {
            safe = false;
            break;
        }
    }

    else if(mode === "decreasing") {
        if (sum > 0) {
            safe = false;
            break;
        }
    }

   }
   if(safe) safeCount++
}
return safeCount;
}

function part2(input) { 
    const reports = input.split('\n');
    let safeCount = 0;
    let reportIndex = 0;
    let unsafeReportCounts = {}
for (const report of reports) { 
    let safe = true;
    const numbers = report.replace('\r','').split(' ');

    let mode = Number(numbers[0]) < Number(numbers[1]) ? "increasing" : "decreasing"

   for(let i=0;i<=numbers.length -1;i++) {
    if(i == 0) {
        continue;
    }
    let sum = Number(numbers[i]) - Number(numbers[i-1]);
    let diff = sum > 0 ? sum : -sum;

    if(diff < 1 || diff > 3) {
        safe = false;
        console.log(numbers[i-1])
        if(!unsafeReportCounts[reportIndex]) unsafeReportCounts[reportIndex] = [];
        if(unsafeReportCounts[reportIndex].includes(i-1)) continue;
        unsafeReportCounts[reportIndex].push(i-1);
    }

    if(mode === "increasing") {
        if (sum < 0) {
            safe = false;
            console.log(numbers[i-1])
            if(!unsafeReportCounts[reportIndex]) unsafeReportCounts[reportIndex] = [];
        if(unsafeReportCounts[reportIndex].includes(i-1)) continue;
            unsafeReportCounts[reportIndex].push(i-1);
        }
    }

    else if(mode === "decreasing") {
        if (sum >= 0) {
            safe = false;
            console.log(numbers[i-1])
            if(!unsafeReportCounts[reportIndex]) unsafeReportCounts[reportIndex] = [];
        if(unsafeReportCounts[reportIndex].includes(i-1)) continue;
            unsafeReportCounts[reportIndex].push(i-1);
        }
    }

   }
   if(safe) safeCount++
   reportIndex++
}
for (const key in unsafeReportCounts) {
    let report = reports[key].replace('\r','').split(' ');
    if(unsafeReportCounts[key].length <= 1) {
        console.log(key)
        let splicedReport = report.filter((_, index) => index !== unsafeReportCounts[key][0]);
        if(isSafe(splicedReport)) {
            console.log(key + "is safe")
            safeCount++
    }
}
}
console.log(safeCount)
return safeCount;
}



function isSafe(numbers) {
    let safe = true;

    let mode = Number(numbers[0]) < Number(numbers[1]) ? "increasing" : "decreasing"

   for(let i=0;i<=numbers.length -1;i++) {
    if(i == 0) {
        continue;
    }
    let sum = Number(numbers[i]) - Number(numbers[i-1]);
    let diff = sum > 0 ? sum : -sum;

    if(diff < 1 || diff > 3) {
        safe = false;
        break;
    }

    if(mode === "increasing") {
        if (sum < 0) {
            safe = false;
            break;
        }
    }

    else if(mode === "decreasing") {
        if (sum >= 0) {
            safe = false;
            break;
        }
    }

   }
   return safe
}


part2(input)