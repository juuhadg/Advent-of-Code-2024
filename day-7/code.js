const input = require("fs").readFileSync("./day-7/input.txt", "utf-8");

let tests = input.split("\n").map((line) => Number(line.trim().split(":")[0]));
let numbers = input.split("\n").map((line) => line.trim().split(":")[1].trim());

const operators = ["+", "*", "||"]; // Inclui concatenação
let res = 0;

for (let i = 0; i < tests.length; i++) {
  let valid = false;
  let test = tests[i];
  let number = numbers[i];
  let spaces = number.split(" ").length - 1; // Número de espaços para operadores
  let totalCombinations = Math.pow(operators.length, spaces); // Total de combinações
  let possibilities = [];
  number = number.split(" ").map((n) => Number(n)); // Divide os números corretamente

  for (let comb = 0; comb < totalCombinations; comb++) {
    let expression = "";
    let currentCombination = comb;
    const expressionParts = [];

    // Constrói a expressão com base na combinação atual
    for (let j = 0; j < spaces; j++) {
      const operatorIndex = currentCombination % operators.length; // Seleciona o operador atual
      expressionParts.push(number[j]); // Adiciona o número
      expressionParts.push(operators[operatorIndex]); // Adiciona o operador
      expression += number[j] + " " + operators[operatorIndex] + " ";
      currentCombination = Math.floor(currentCombination / operators.length); // Próximo operador
    }
    expressionParts.push(number[number.length - 1]); // Adiciona o último número
    expression += number[number.length - 1];

    // Calcula o resultado desconsiderando precedência
    const result = computeLeftToRight(expressionParts);

    // Verifica se o resultado corresponde ao valor esperado
    if (result === test) valid = true;

    possibilities.push({ expression, result });
  }

  if (valid) {
    res += test;
    console.log(`Match encontrado para ${test}`);
  }
}

// Função para calcular da esquerda para a direita, incluindo concatenação
function computeLeftToRight(expressionParts) {
  let result = expressionParts[0]; // Começa com o primeiro número
  for (let i = 1; i < expressionParts.length; i += 2) {
    const operator = expressionParts[i];
    const nextNumber = expressionParts[i + 1];
    if (operator === "+") {
      result += nextNumber;
    } else if (operator === "*") {
      result *= nextNumber;
    } else if (operator === "||") {
      // Realiza concatenação corretamente
      result = parseInt(result.toString() + nextNumber.toString(), 10);
    }
  }
  return result;
}

console.log("Resultado final:", res);
