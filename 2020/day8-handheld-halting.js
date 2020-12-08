#!/usr/bin/env node

const fs = require('fs');
const input = fs.readFileSync('./2020/day8-input.txt', 'utf-8').trim();
const lines = input.split(/\n/);

const part1 = () => {
    const map = {};
    let index = 0;
    let acc = 0;
    while (index < lines.length) {
        if (map[index]) {
            console.log('Infinite loop. acc=', acc);
            break;
        }
        map[index] = true;
        let [ins, arg] = lines[index].split(' ');
        if (ins === 'acc') {
            acc += Number(arg);
        } else if (ins === 'jmp') {
            index += Number(arg) - 1;
        } else if (ins === 'nop') {
            // nop
        } else {
            console.log('Bad input');
        }
        index ++;
    }

    console.log('Program ends. acc=', acc); // 1394
}

const part2 = () => {
    const map = {};
    let index = 0;
    let prevJumpIndex = null;
    let acc = 0;
    while (index < lines.length) {
        if (map[index]) {
            console.log('What if we ignore the jump at', prevJumpIndex);
            index = prevJumpIndex + 1;
        }
        map[index] = true;
        let [ins, arg] = lines[index].split(' ');
        if (ins === 'acc') {
            acc += Number(arg);
        } else if (ins === 'jmp') {
            prevJumpIndex = index;
            index += Number(arg);
            continue;
        } else if (ins === 'nop') {
            // nop
        } else {
            console.log('Bad input');
        }
        index ++;
    }

    console.log('Program ends. acc=', acc);
}

part1(); // 1394
part2(); // 1626
