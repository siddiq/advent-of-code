#!/usr/bin/env node

const fs = require('fs');
const input = fs.readFileSync('./2020/day12-input.txt', 'utf-8').trim();
const lines = input.split(/\n/);

const play = steps => {
    let x = 0;
    let y = 0;
    let dir = 'E';
    let dx = { N: 0, S: 0, E: 1, W: -1 };
    let dy = { N: 1, S: -1, E: 0, W: 0 };

    const rotate = () => {
        dir = {E:'S', S:'W', W:'N', N:'E'}[dir];
    };

    steps.forEach(step => {
        const d = step[0];
        const num = Number(step.substr(1));
        if (d === 'N') { y += num; }
        if (d === 'S') { y -= num; }
        if (d === 'E') { x += num; }
        if (d === 'W') { x -= num; }
        if (d === 'F') {
            x += dx[dir] * num;
            y += dy[dir] * num;
        }
        if (d === 'R') {
            for (let n = 0 ; n < num; n += 90) {
                rotate();
            }
        }
        if (d === 'L') {
            for (let n = 0 ; n < num; n += 90) {
                rotate();
                rotate();
                rotate();
            }
        }
    });

    return Math.abs(x) + Math.abs(y);
};

const play2 = steps => {
    let x = 0;
    let y = 0;

    let wpx = 10;      // east 10
    let wpy = 1;       // north 1

    const rotate = () => {
        let temp = wpx;
        wpx = wpy;
        wpy = -temp;
    };

    steps.forEach(step => {
        const d = step[0];
        const num = Number(step.substr(1));
        if (d === 'N') { wpy += num; }
        if (d === 'S') { wpy -= num; }
        if (d === 'E') { wpx += num; }
        if (d === 'W') { wpx -= num; }
        if (d === 'F') {
            x += wpx * num;
            y += wpy * num;
        }
        if (d === 'R') {
            for (let n = 0 ; n < num; n += 90) {
                rotate();
            }
        }
        if (d === 'L') {
            for (let n = 0 ; n < num; n += 90) {
                rotate();
                rotate();
                rotate();
            }
        }
    });

    return Math.abs(x) + Math.abs(y);
};

console.log(play(lines)); // <-- 1496

console.log(play2(lines)); // <-- 63843
