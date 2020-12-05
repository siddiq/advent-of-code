#!/usr/bin/env node

const fs = require('fs');
const input = fs.readFileSync('./2020/day3-input.txt', 'utf-8').trim();
const lines = input.split('\n');


const part1 = ({ right, down }) => {
    let col = 0;
    let row = 0;
    let treeCount = 0;
    while (row < lines.length) {
        if (lines[row].charAt(col) === '#') {
            treeCount ++;
        }
        row += down;
        col += right;
        if (col >= lines[0].length) {
            col -= lines[0].length;
        }
    }
    console.log(treeCount);
    return treeCount
};

// part 1
// part1({ right: 3, down: 1 });    // 164

// part 2
const a = part1({ right: 1, down: 1 });
const b = part1({ right: 3, down: 1 });
const c = part1({ right: 5, down: 1 });
const d = part1({ right: 7, down: 1 });
const e = part1({ right: 1, down: 2 });

console.log(a,b,c,d,e);
console.log(a*b*c*d*e);
