#!/usr/bin/env node

const fs = require('fs');
const input = fs.readFileSync('./2020/day7-input.txt', 'utf-8').trim();
const lines = input.split(/\n/);

const parse = line => {
    const colorMatch = line.match(/^(.+) bags contain/);
    if (!colorMatch) {
        console.log('Problem in line', line);
    }
    const color = colorMatch[1];
    const childrenMatch = line.match(/bags contain (.+)/);
    if (!childrenMatch) {
        console.log('Problem in line', line);
    }
    let children = null;
    if (childrenMatch[1] !== 'no other bags.') {
        children = childrenMatch[1]
            .trim()
            .split(',')
            .map(rawChild => {
                const childMatch = rawChild.trim().replace(/ bags?\.?$/, '').match(/(\d+|) ([^$]+)/);
                const quantity = childMatch[1];
                const color = childMatch[2];
                return {
                    quantity,
                    color
                };
            });
    }

    return {
        color,
        children
    };
};

const map = {};
lines.forEach(line => {
    const { color, children } = parse(line);
    map[color] = children
});

const parents = {};
for (const [keyAsParentColor, valueAsChildren] of Object.entries(map)) {
    if (valueAsChildren) {
        valueAsChildren.forEach(child => {
            parents[child.color] = parents[child.color] || [];
            parents[child.color].push(keyAsParentColor);
        });
    }
}

const containers = new Set();
const findParents = color => {
    if (!parents[color]) {
        return;
    }
    parents[color].forEach(parent => {
        containers.add(parent)
        findParents(parent);
    });
};

findParents('shiny gold');
console.log(containers.size); // 326

// part 2
const countChildren = color => {
    if (!map[color]) {
        return 1;
    }
    let total = 1;
    map[color].forEach(c => {
        total += c.quantity * countChildren(c.color);
    });
    return total;
};

console.log(countChildren('shiny gold') - 1); // 5635
