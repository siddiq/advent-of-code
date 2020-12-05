#!/usr/bin/env node

const fs = require('fs');
const input = fs.readFileSync('./2020/day5-input.txt', 'utf-8').trim();

const arr = input.split('\n')
    .map(line => line.replace(/F/g, '0').replace(/B/g, '1').replace(/L/g, '0').replace(/R/g, '1'))
    .sort()
    .map(line => parseInt(line, 2))

console.log('Highest seat number', arr[arr.length - 1])

const booked = {};
arr.forEach(num => booked[num] = true);

for (let myseat = arr[0]; myseat <= arr[arr.length - 1]; myseat ++) {
    if (!booked[myseat] && booked[myseat - 1] && booked[myseat + 1]) {
        console.log('This could be my seat', myseat);
    }
}
