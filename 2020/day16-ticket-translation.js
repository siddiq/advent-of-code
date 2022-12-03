#!/usr/bin/env node

const fs = require('fs');
const input = fs.readFileSync('./2020/day16-input.txt', 'utf-8').trim();
const input2 = `
class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12
`.trim();
const lines = input.split(/\n/);

const ranges = [];
let state = "rules";

let badNums = [];
for (let i = 0; i < lines.length; i ++) {
    if (state === "rules") {
        let matches = lines[i].match(/[0-9]+/g);
        if (matches) {
            ranges.push([Number(matches[0]), Number(matches[1])]);
            ranges.push([Number(matches[2]), Number(matches[3])]);
        }
        if (lines[i] === "your ticket:") {
            state = "your-ticket";
        }
    } else if (state === "your-ticket") {
        if (lines[i] === "nearby tickets:") {
            state = "nearby-tickets";
        }
    } else if (state === "nearby-tickets") {
        const notFound = lines[i].split(",").map(num => Number(num)).filter(num => {
            console.log('checking', num)
            const x = ranges.filter(range => num >= range[0] && num <= range[1]);
            // console.log(`${num} found in range`, JSON.stringify(x,0,2))
            if (x.length > 0) {
                console.log(`ok`, JSON.stringify(x));
            } else {
                console.log(`bad number`, num);
            }
            return ranges.filter(range => num >= range[0] && num <= range[1]).length === 0;
        });
        console.log('notFound', notFound);
        badNums = [...badNums, ...notFound];
    }
}

const sum = badNums.reduce((acc, cur) => acc + cur, 0)
console.log('badNums', badNums);
console.log('sum', sum);
// <-- 28873
