const FILE = "5.txt";
const fs = require("fs");
const input = fs.readFileSync(FILE, "utf-8");
const lines = input.trim().split("\n");

const map = {}; // x,y
const counts = {};
let dangers = 0;
const build = (x, y) => {
  const key = `${x},${y}`;
  map[key] = (map[key] || 0) + 1;
  if (map[key] > 1) {
    dangers++;
  }
  counts[map[key]] = (counts[map[key]] || 0) + 1;
};
lines.forEach((line) => {
  let [x1, y1, x2, y2] = line.match(/\d+/g);
  x1 = Number(x1);
  x2 = Number(x2);
  y1 = Number(y1);
  y2 = Number(y2);
  if (x1 === x2) {
    let a = Math.min(y1, y2);
    let b = Math.max(y1, y2);
    for (let y = a; y <= b; y++) {
      build(x1, y);
    }
  } else if (y1 === y2) {
    let a = Math.min(x1, x2);
    let b = Math.max(x1, x2);
    for (let x = a; x <= b; x++) {
      build(x, y1);
    }
  } else if (Math.abs(x2 - x1) === Math.abs(y2 - y1)) {
    // right down
    if (x1 <= x2 && y1 <= y2) {
      for (let x = x1, y = y1; x <= x2; x++, y++) {
        build(x, y);
      }
    }
    // left up
    if (x1 >= x2 && y1 >= y2) {
      for (let x = x1, y = y1; x >= x2; x--, y--) {
        build(x, y);
      }
    }
    // right up
    if (x1 <= x2 && y1 >= y2) {
      for (let x = x1, y = y1; x <= x2; x++, y--) {
        build(x, y);
      }
    }
    // left down
    if (x1 >= x2 && y1 <= y2) {
      for (let x = x1, y = y1; x >= x2; x--, y++) {
        build(x, y);
      }
    }
  }
});

console.log(map);

// console.log(minx, miny);
// console.log(maxx, maxy);
// console.log(Object.keys(map));
console.log(dangers);
console.log(counts);

let lines2 = "";
for (let y = 0; y <= 9; y++) {
  let line = "";
  for (let x = 0; x <= 9; x++) {
    line += map[`${x},${y}`] || ".";
  }
  lines2 += line + "\n";
}
console.log(lines2);
