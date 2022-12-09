const FILE = "9.txt";
const fs = require("fs");
const input = fs.readFileSync(FILE, "utf-8");
const lines = input.trim().split("\n");

function simulate(snakeLength) {
  const marks = new Set();

  let knots = [];
  for (let i = 0; i < snakeLength; i++) {
    knots[i] = { x: 0, y: 0 };
  }

  function markTail() {
    const tail = knots[knots.length - 1];
    marks.add(`${tail.x},${tail.y}`);
  }
  markTail();

  lines.forEach((line) => {
    const [dir, steps] = line.split(" ");
    for (let i = 0; i < steps; i++) {
      // move head
      if (dir === "U") {
        knots[0].y++;
      } else if (dir === "D") {
        knots[0].y--;
      } else if (dir === "L") {
        knots[0].x--;
      } else if (dir === "R") {
        knots[0].x++;
      }
      // follow tails
      for (let k = 1; k < snakeLength; k++) {
        if (knots[k - 1].y - knots[k].y > 1) {
          knots[k].y++;
          if (knots[k - 1].x < knots[k].x) {
            knots[k].x--;
          }
          if (knots[k - 1].x > knots[k].x) {
            knots[k].x++;
          }
        } else if (knots[k - 1].y - knots[k].y < -1) {
          knots[k].y--;
          if (knots[k - 1].x < knots[k].x) {
            knots[k].x--;
          }
          if (knots[k - 1].x > knots[k].x) {
            knots[k].x++;
          }
        } else if (knots[k - 1].x - knots[k].x > 1) {
          knots[k].x++;
          if (knots[k - 1].y < knots[k].y) {
            knots[k].y--;
          }
          if (knots[k - 1].y > knots[k].y) {
            knots[k].y++;
          }
        } else if (knots[k - 1].x - knots[k].x < -1) {
          knots[k].x--;
          if (knots[k - 1].y < knots[k].y) {
            knots[k].y--;
          }
          if (knots[k - 1].y > knots[k].y) {
            knots[k].y++;
          }
        }
      }
      // console.log(JSON.stringify(knots));
      markTail();
    }
  });
  return marks.size;
}

console.log(simulate(2));
console.log(simulate(10));
