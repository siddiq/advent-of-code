#!/usr/bin/env node

const fs = require('fs');
const input = fs.readFileSync('./day2-input.txt', 'utf-8');
const lines = input.split('\n');

const parse = (line) => {
    const match = line.match(/^(\d+)-(\d+) (.): (.+)$/)
    if (!match) {
        console.log(`Bad regex. Cant parse "${line}"`);
        process.exit(1);
    }
    const low = match[1];
    const high = match[2];
    const char = match[3];
    const password = match[4];

    const reconstrucedLine = `${low}-${high} ${char}: ${password}`;
    if (line !== reconstrucedLine) {
        console.log(`Problem in regex. "${line}"`, match);
        process.exit(1);
    }

    return { low, high, char, password };
};

const policy1 = () => {
    let validPasswordsCount = 0;
    lines.forEach(line => {
        if (line.trim() === '') {
            return;
        }
        const {low, high, char, password} = parse(line);

        let count = 0;
        password.split('').forEach(c => {
            if (c === char) {
                count ++;
            }
        });
        console.log('Input:', line);
        console.log('found=', count);
        if (count >= low && count <= high) {
            console.log('its valid');
            validPasswordsCount ++;
        } else {
            console.log('no');
        }
        console.log('');
    });

    console.log(validPasswordsCount);
    // 506
};

const policy2 = () => {
    let validPasswordsCount = 0;
    lines.forEach(line => {
        if (line.trim() === '') {
            return;
        }
        const {low, high, char, password} = parse(line);
        const pos1 = low - 1;
        const pos2 = high - 1;

        let isPasswordValid = false;
        if (password[pos1] === char || password[pos2] === char) {
            isPasswordValid = true;
        }
        if (password[pos1] === char && password[pos2] === char) {
            isPasswordValid = false;
        }

        console.log(pos1, password[pos1]);
        console.log(pos2, password[pos2]);
        if (pos1 < 0 || pos1 >= password.length) {
            console.log(`Bad input? line=${line}, pos1=${pos1}`);
            process.exit(1);
        }
        if (pos2 < 0 || pos2 >= password.length) {
            console.log(`Bad input? line=${line}, pos2=${pos2}`);
            process.exit(1);
        }

        console.log('Input:', line);
        if (isPasswordValid) {
            console.log('its valid');
            validPasswordsCount ++;
        } else {
            console.log('no');
        }
        console.log('');
    });

    console.log(validPasswordsCount);
    // 443
};


// policy1();
policy2();
