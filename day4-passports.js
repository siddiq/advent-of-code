#!/usr/bin/env node

const fs = require('fs');
const input = fs.readFileSync('./day4-input.txt', 'utf-8').trim();
const lines = input.split('\n');

const passports = [];
let passport = '';
lines.forEach(line => {
    if (line !== '') {
        passport += ' ' + line;
    } else {
        passport = passport.trim();
        const json = {};
        passport.split(/[ \n]/).forEach(str => {
            const arr = str.split(':');
            json[arr[0]] = arr[1];
        });
        passports.push(json);
        passport = '';
    }
});

const part1 = passports => passports.filter(pass => {
    const missing = [];
    ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].forEach(f => {
        if (!pass[f]) {
            missing.push(f);
        }
    });

    const isValid = missing.length === 0;
    return isValid;
});

const part2 = passports => passports.filter(pass => {
    const invalid = [];
    if (Number(pass.byr) < 1920 || Number(pass.byr) > 2002) {
        invalid.push('byr');
    }
    if (Number(pass.iyr) < 2010 || Number(pass.iyr) > 2020) {
        invalid.push('iyr');
    }
    if (Number(pass.eyr) < 2020 || Number(pass.eyr) > 2030) {
        invalid.push('eyr');
    }
    if (pass.hgt) {
        const hgtMatch = pass.hgt.match(/(\d+)(in|cm)/i);
        if (!hgtMatch) {
            invalid.push('hgt:fmt');
        } else {
            if (hgtMatch[2] === 'cm') {
                if (Number(hgtMatch[1]) < 150 || Number(hgtMatch[1]) > 193 ) {
                    invalid.push('hgt:range');
                }
            }
            if (hgtMatch[2] === 'in') {
                if (Number(hgtMatch[1]) < 59 || Number(hgtMatch[1]) > 76 ) {
                    invalid.push('hgt:range');
                }
            }
        }
    }
    if (! /^#[0-9a-f]{6}$/i.test(pass.hcl)) {
        invalid.push('hcl:fmt');
    }
    if (! /^amb|blu|brn|gry|grn|hzl|oth$/i.test(pass.ecl)) {
        invalid.push('ecl:fmt');
    }
    if (! /^[0-9]{9}$/.test(pass.pid)) {
        invalid.push('pid:fmt');
    }

    const isValid = invalid.length === 0;
    return isValid;
});

console.log(passports.length);
console.log('Part 1', part1(passports).length); // 191 ..... expected 192
console.log('Part 2', part2(part1(passports)).length); // 100 ..... expected 101
