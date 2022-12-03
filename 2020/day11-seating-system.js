#!/usr/bin/env node

const fs = require('fs');
const input = fs.readFileSync('./2020/day11-input.txt', 'utf-8').trim();
const lines = input.split(/\n/);

const part1 = {
    countSeats: ({ seats, row, col }) => {
        const inRange = (row, col) => row >= 0 && row < seats.length && col >= 0 && col < seats[0].length;

        let count = 0;

        for (let r = row - 1; r <= row + 1; r ++) {
            for (let c = col - 1; c <= col + 1; c ++) {
                if ((r !== row || c !== col) && inRange(r, c) && seats[r][c] === '#') {
                    count ++;
                }
            }
        }
        return count;
    },

    round: ({ seats, countSeats }) => {
        const seats2 = JSON.parse(JSON.stringify(seats));
        for (let row = 0; row < seats.length; row ++) {
            for (let col = 0; col < seats[0].length; col ++) {
                const count = countSeats({ seats, row, col });
                if (seats[row][col] === 'L' && count === 0) {
                    seats2[row][col] = '#';
                } else if (seats[row][col] === '#' && count >= 4) {
                    seats2[row][col] = 'L';
                }
            }
        }
        return seats2;
    }
};

const part2 = {
    countSeats: ({ seats, row, col }) => {
        const scan = (r, c, rd, cd) => {
            r += rd;
            c += cd;
            while (r >= 0 && r < seats.length && c >= 0 && c < seats[0].length) {
                if (seats[r][c] === 'L') { return 0; }
                if (seats[r][c] === '#') { return 1; }
                r += rd;
                c += cd;
            }
            return 0;
        }

        return (
            scan(row, col, -1, -1) +
            scan(row, col, -1, 0) +
            scan(row, col, -1, 1) +

            scan(row, col, 0, -1) +
            scan(row, col, 0, 1) +

            scan(row, col, 1, -1) +
            scan(row, col, 1, 0) +
            scan(row, col, 1, 1)
        );

    },

    round: ({ seats, countSeats }) => {
        const updated = JSON.parse(JSON.stringify(seats));
        for (let row = 0; row < seats.length; row ++) {
            for (let col = 0; col < seats[0].length; col ++) {
                const count = countSeats({ seats, row, col });
                if (seats[row][col] === 'L' && count === 0) {
                    updated[row][col] = '#';
                } else if (seats[row][col] === '#' && count >= 5) {
                    updated[row][col] = 'L';
                }
            }
        }
        return updated;
    }
};

const printLayout = seats => seats.forEach(row => console.log(row.join('')));

const play = (config) => {
    const { round, countSeats } = config;
    let seats = lines.map(line => line.split(''));

    let equilibriumAchived = false;
    while (!equilibriumAchived) {
        let updated = round({ seats, countSeats });
        equilibriumAchived = JSON.stringify(updated) === JSON.stringify(seats);
        seats = updated;
    }

    return seats.flat().filter(c => c === '#').length;
};


console.log(play(part1)); // <-- 2299

console.log(play(part2)); // <-- 2047
