#!/usr/bin/env node

// const input = [1, 3, 2];
const input = [2, 1, 3];
// const input = [1, 2, 3];

// const input = [6, 3, 15, 13, 1, 0];
// 6: 0
// 3: 1
// 15: 2
// 13: 3
// 1: 4
// 0: 5

// 6: 1
// 3: 1
// 15: 1
// 13: 1
// 1: 1
// 0: 1


console.log(input);

const part1 = (input) => {
    const arr = [...input];
    while (arr.length < 20) {
        const last = arr[arr.length - 1];
        const position = arr.slice(0, arr.length - 1).lastIndexOf(last);
        if (position === -1) {
            arr.push(0);
        } else {
            arr.push(arr.length - position - 1);
        }
    }

    console.log(arr.join(', '))

    return arr[arr.length - 1];
}

const part2 = (input) => {
    const pos = {};
    const count = {};
    input.forEach((e, index) => {
        pos[e] = index;
        count[e] = 1;
    });

    const debug = [...input];
    let seondLast = input[input.length - 2];
    let last = input[input.length - 1];
    for (let i = input.length; i < 20; i ++) {
        if (count[last] === 1) {
            last = 0;
        } else {
            last = i - pos[last];
        }
        debug.push(last);
        pos[seondLast] = i - 1;
        count[seondLast] = (count[seondLast] || 0) + 1;
        seondLast = last;
    }

    console.log(debug.join(', '))

    return last;
}



console.log(part1(input)); // 700

console.log(part2(input));
