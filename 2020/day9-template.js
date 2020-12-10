#!/usr/bin/env node

const fs = require('fs');
const input = fs.readFileSync('./2020/day9-input.txt', 'utf-8').trim();
const lines = input.split(/\n/);

const part1 = (arr, size) => {
    for (let i = size; i < arr.length; i ++) {
        let num = arr[i];
        let isValid = false;
        for (let j = i - size; j < i; j ++) {
            for (let k = j + 1; k < i; k ++) {
                if (arr[j] + arr[k] === num) {
                    isValid = true;
                }
            }
        }
        if (!isValid) {
            return num;
        }
    }
}

const part2 = (arr, size, inValidNum) => {
    for (let i = size; i < arr.length; i ++) {
        for (let j = i - size; j < i; j ++) {
            for (let k = j + 1; k < i; k ++) {
                let sum = 0;
                let min = arr[j];
                let max = arr[j];
                for (let s = j; s <= k; s ++) {
                    sum += arr[s];
                    min = Math.min(min, arr[s]);
                    max = Math.max(max, arr[s]);
                }
                if (sum === inValidNum) {
                    return min + max;
                }
            }
        }
    }
}

const arr = lines.map(line => Number(line));

const inValidNum = part1(arr, 25);
console.log(inValidNum); // 400480901

const sum = part2(arr, 25, inValidNum);
console.log(sum); // 67587168
