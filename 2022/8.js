const FILE = "8a.txt";
const fs = require("fs");
const input = fs.readFileSync(FILE, "utf-8");
const lines = input.trim().split("\n");

const trees = lines.map((line) => line.split("").map((n) => Number(n)));
const width = trees[0].length;
const height = trees.length;

const outerTrees = width * 2 + height * 2 - 4;

function getVisible(r, c) {
  const h = trees[r][c];
  let top = true;
  for (let i = r - 1; i >= 0; i--) {
    if (trees[i][c] >= h) {
      top = false;
      break;
    }
  }
  let bottom = true;
  for (let i = r + 1; i < height; i++) {
    if (trees[i][c] >= h) {
      bottom = false;
      break;
    }
  }
  let left = true;
  for (let i = c - 1; i >= 0; i--) {
    if (trees[r][i] >= h) {
      left = false;
      break;
    }
  }
  let right = true;
  for (let i = c + 1; i < width; i++) {
    if (trees[r][i] >= h) {
      right = false;
      break;
    }
  }
  return left || right || top || bottom ? 1 : 0;
}

let count = 0;
for (let r = 1; r < height - 1; r++) {
  for (let c = 1; c < width - 1; c++) {
    count += getVisible(r, c);
  }
}

console.log(count + outerTrees);

// part 2
function countVisible(r, c) {
  const h = trees[r][c];
  let top = 0;
  for (let i = r - 1; i >= 0; i--) {
    top++;
    if (trees[i][c] >= h) {
      break;
    }
  }

  let bottom = 0;
  for (let i = r + 1; i < height; i++) {
    bottom++;
    if (trees[i][c] >= h) {
      break;
    }
  }
  let left = 0;
  for (let i = c - 1; i >= 0; i--) {
    left++;
    if (trees[r][i] >= h) {
      break;
    }
  }
  let right = 0;
  for (let i = c + 1; i < width; i++) {
    right++;
    if (trees[r][i] >= h) {
      break;
    }
  }
  return top * bottom * left * right;
}

let best = 0;
for (let r = 0; r < height; r++) {
  for (let c = 0; c < width; c++) {
    best = Math.max(best, countVisible(r, c));
  }
}

console.log(best);
