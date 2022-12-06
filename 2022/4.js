const FILE = "4a.txt";
const fs = require("fs");
const input = fs.readFileSync(FILE, "utf-8");
const lines = input.trim().split("\n");

let count = 0;
let part2 = 0;
lines.forEach((line) => {
  const [left, right] = line.split(",");
  const range1 = left.split("-").map((n) => Number(n));
  const range2 = right.split("-").map((n) => Number(n));

  let inclusive = false;
  if (range1[0] >= range2[0] && range1[0] <= range2[1]) {
    if (range1[1] >= range2[0] && range1[1] <= range2[1]) {
      inclusive = true;
    }
  }
  if (range2[0] >= range1[0] && range2[0] <= range1[1]) {
    if (range2[1] >= range1[0] && range2[1] <= range1[1]) {
      inclusive = true;
    }
  }
  if (inclusive) {
    count++;
  }

  // part 2
  let slightly = false;
  if (
    (range1[0] >= range2[0] && range1[0] <= range2[1]) ||
    (range1[1] >= range2[0] && range1[1] <= range2[1])
  ) {
    slightly = true;
  }

  if (
    (range2[0] >= range1[0] && range2[0] <= range1[1]) ||
    (range2[1] >= range1[0] && range2[1] <= range1[1])
  ) {
    slightly = true;
  }
  if (slightly) {
    part2++;
  }
});

console.log(count, part2);
