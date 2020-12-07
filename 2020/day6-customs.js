#!/usr/bin/env node

const fs = require('fs');
const input = fs.readFileSync('./2020/day6-input.txt', 'utf-8').trim().split('\n\n');

const getAnswerSheet = group => {
    const answerSheet = {};
    group.split('').forEach(char => {
        if (/^[a-z]$/.test(char)) {
            answerSheet[char] = (answerSheet[char] || 0) + 1;
        }
    });
    return answerSheet;
}

console.log(
    input.reduce((acc, cur) => Object.keys(getAnswerSheet(cur)).length + acc, 0)
); // 6903

console.log(
    input.reduce((acc, group) => {
        const peopleCount = group.split('\n').length;
        return acc += Object.values(getAnswerSheet(group)).filter(value => value === peopleCount).length;
    }, 0)
); // 3493
