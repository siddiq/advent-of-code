#!/usr/bin/env node

const fs = require('fs');
const input = fs.readFileSync('./2020/day18-input.txt', 'utf-8').trim();
const lines = input.split(/\n/);



const evalLeftToRight = expr => {
    const tokens = expr.match(/(\d+|\+|\*)/g);

    while (tokens.length >= 3) {
        const a = Number(tokens.shift());
        const op = tokens.shift();
        const b = Number(tokens.shift());
        let val;
        if (op === '+') {
            val = a + b;
        } else if (op === '*') {
            val = a * b;
        }
        tokens.unshift(val);
    }

    return tokens[0];
};

const evalPlusThenMultiply = expr => {
    let tokens = expr.match(/(\d+|\+|\*)/g);

    while (tokens.indexOf('+') >= 0) {
        const plusIndex = tokens.indexOf('+');
        const a = Number(tokens[plusIndex - 1]);
        const b = Number(tokens[plusIndex + 1]);
        tokens = tokens.slice(0, plusIndex - 1).concat([a + b]).concat(tokens.slice(plusIndex + 2));
    }

    while (tokens.indexOf('*') >= 0) {
        const plusIndex = tokens.indexOf('*');
        const a = Number(tokens[plusIndex - 1]);
        const b = Number(tokens[plusIndex + 1]);
        tokens = tokens.slice(0, plusIndex - 1).concat([a * b]).concat(tokens.slice(plusIndex + 2));
    }

    return tokens[0];
};

const solve = (input, evaluator) => {
    let expr = input;
    while (!/^\d+$/.test(expr)) {
        let sub;
        do {
            sub = expr.match(/\([\d+* ]+\)/g)
            if (sub && sub.length) {
                sub = sub.filter(s => /^\(.*\)$/.test(s));
                sub.forEach(s => {
                    const value = evaluator(s);
                    expr = expr.replace(s, value)
                });
            } else {
                expr = evaluator(expr);
            }

        } while (sub);
    }
    return expr;
};

// part 1 tests
console.log(
    51 === solve('1 + (2 * 3) + (4 * (5 + 6))', evalLeftToRight),
    26 === solve('2 * 3 + (4 * 5)', evalLeftToRight),
    437 === solve('5 + (8 * 3 + 9 + 3 * 4 * 3)', evalLeftToRight),
    12240 === solve('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))', evalLeftToRight),
    13632 === solve('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2', evalLeftToRight),
);

// part 1
console.log(
    lines.reduce((sum, line) => sum + solve(line, evalLeftToRight), 0)
);

// part 2 tests
console.log(
    231 === solve('1 + 2 * 3 + 4 * 5 + 6', evalPlusThenMultiply),
    51 === solve('1 + (2 * 3) + (4 * (5 + 6))', evalPlusThenMultiply),
    46 === solve('2 * 3 + (4 * 5)', evalPlusThenMultiply),
    1445 === solve('5 + (8 * 3 + 9 + 3 * 4 * 3)', evalPlusThenMultiply),
    669060 === solve('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))', evalPlusThenMultiply),
    23340 === solve('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2', evalPlusThenMultiply),
);

// part 2
console.log(
    lines.reduce((sum, line) => sum + solve(line, evalPlusThenMultiply), 0)
);
