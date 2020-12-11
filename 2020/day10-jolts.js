#!/usr/bin/env node

const fs = require('fs');
const input = fs.readFileSync('./2020/day10-input.txt', 'utf-8').trim();
const lines = input.split(/\n/);

const arr = lines.map(line => Number(line)).sort((a, b) => a - b);

const part1 = () => {
    let jolts1 = 1;
    let jolts3 = 1;
    for (let i = 0 ; i < arr.length; i ++) {
        let diff = arr[i] - arr[i-1];
        if (diff === 1) {
            jolts1 ++;
        }
        if (diff === 3) {
            jolts3 ++;
        }
    }
    return jolts1 * jolts3;
}

const cache = {};
const part2 = () => {
    const findDistinctWays = index => {
        if (cache[index]) {
            return cache[index];
        }
        // return number of ways fron index onwards
        if (index === arr.length - 1) {
            return 1; // only one way
        }
        if (index === arr.length - 2) {
            return 1; // only one way
        }

        let currentElement = index === -1 ? 0 : arr[index];
        let ways = 0;
        if ((index + 1 < arr.length) && arr[index + 1] - currentElement <= 3) {
            ways += findDistinctWays(index + 1);
        }
        if ((index + 2 < arr.length) && arr[index + 2] - currentElement <= 3) {
            ways += findDistinctWays(index + 2);
        }
        if ((index + 3 < arr.length) && arr[index + 3] - currentElement <= 3) {
            ways += findDistinctWays(index + 3);
        }
        cache[index] = ways;
        return ways;
    }

    return findDistinctWays(-1);
}

console.log(part1()); // <-- 1876
console.log(part2()); // <-- 14173478093824
