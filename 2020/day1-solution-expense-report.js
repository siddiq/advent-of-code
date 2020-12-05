#!/usr/bin/env node

const fs = require('fs');
const input = fs.readFileSync('./2020/day1-input.txt', 'utf-8');
const arr = input.trim().split('\n').map(n => Number(n));

console.log(JSON.stringify(arr));

const part1 = () => {
    for (let i = 0; i < arr.length; i ++) {
        for (let j = i + 1; j < arr.length; j ++) {
            if (arr[i] + arr[j] === 2020) {
                console.log(i, j, arr[i], arr[j]);
                console.log(arr[i] + arr[j]);
                console.log(arr[i] * arr[j]);
            }
        }
    }
    // 1007104
}

const part2 = () => {
    for (let i = 0; i < arr.length; i ++) {
        for (let j = i + 1; j < arr.length; j ++) {
            for (let k = j + 1; k < arr.length; k ++) {
                if (arr[i] + arr[j] + arr[k] === 2020) {
                    console.log(i, j, k, arr[i], arr[j], arr[k]);
                    console.log(arr[i] + arr[j] + arr[k]);
                    console.log(arr[i] * arr[j] * arr[k]);
                }
            }
        }
    }
    // 18847752
}

// part1();
part2();
