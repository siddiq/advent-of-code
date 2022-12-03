const FILE = "2.txt";
const input =
  typeof document === "undefined"
    ? require("fs").readFileSync(FILE, "utf-8")
    : document.body.innerText;
const lines = input.split("\n");

// A for Rock, B for Paper, and C for Scissors.
// X for Rock, Y for Paper, and Z for Scissors.
// 1 for Rock, 2 for Paper, and 3 for Scissors)
let total = 0;
lines.forEach((line) => {
  let score = 0;

  // A
  if (line === "A X") {
    // rock rock = draw
    score += 1;
    score += 3; // draw
  }
  if (line === "A Y") {
    // rock paper = win
    score += 2;
    score += 6; // win
  }
  if (line === "A Z") {
    // rock scissors = lose
    score += 3;
    score += 0; // lose
  }
  // B
  if (line === "B X") {
    // paper rock = lose
    score += 1;
    score += 0; // lose
  }
  if (line === "B Y") {
    // paper paper = draw
    score += 2;
    score += 3; // draw
  }
  if (line === "B Z") {
    // paper scissors = win
    score += 3;
    score += 6; // win
  }
  // C
  if (line === "C X") {
    // scissors rock = win
    score += 1;
    score += 6; // win
  }
  if (line === "C Y") {
    // scissors paper = lose
    score += 2;
    score += 0; // lose
  }
  if (line === "C Z") {
    // scissors scissors = draw
    score += 3;
    score += 3; // draw
  }

  total += score;
});

console.log("total", total);

// 2nd part
// X means you need to lose = 0
// Y means you need to draw = 3
// Z means you need to win = 6
let part2 = 0;
lines.forEach((line) => {
  let score = 0;
  const [left, right] = line.split(" ");

  if (right === "X") {
    // please lose
    if (left === "A") {
      score += 3; // rock scissors = lose
    }
    if (left === "B") {
      score += 1; // paper rock = lose
    }
    if (left === "C") {
      score += 2; // scissors paper = lose
    }
    score += 0;
  }
  if (right === "Y") {
    // please draw
    if (left === "A") {
      score += 1; // rock rock = draw
    }
    if (left === "B") {
      score += 2; // paper paper = draw
    }
    if (left === "C") {
      score += 3; // scissors scissors = draw
    }
    score += 3;
  }
  if (right === "Z") {
    // please win
    if (left === "A") {
      score += 2; // rock paper = win
    }
    if (left === "B") {
      score += 3; // paper scissors = win
    }
    if (left === "C") {
      score += 1; // scissors rock = win
    }
    score += 6;
  }

  console.log(line, score);
  part2 += score;
});

console.log("part2", part2);
