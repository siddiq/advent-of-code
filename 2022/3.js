const FILE = "3.txt";
const fs = require("fs");
const input = fs.readFileSync(FILE, "utf-8");
const lines = input.split("\n");

const getPrio = (char) => {
  const code = char.charCodeAt(0);
  let prio = 0;
  if (code >= "a".charCodeAt(0) && code <= "z".charCodeAt(0)) {
    prio = 1 + code - "a".charCodeAt(0);
  } else if (code >= "A".charCodeAt(0) && code <= "Z".charCodeAt(0)) {
    prio = 27 + code - "A".charCodeAt(0);
  }
  return prio;
};

let sum = 0;
lines.forEach((line) => {
  const left = line.substring(0, line.length / 2);
  const right = line.substring(line.length / 2);

  let found = false;
  left.split("").forEach((char) => {
    if (found) {
      return;
    }
    if (right.indexOf(char) >= 0) {
      found = true;
      // console.log(char, getPrio(char));
      sum += getPrio(char);
    }
  });
});

// part 2
let sum2 = 0;
for (let i = 0; i < lines.length; i += 3) {
  const part1 = lines[i];
  const part2 = lines[i + 1];
  const part3 = lines[i + 2];

  let found = false;
  part1.split("").forEach((char) => {
    if (found) {
      return;
    }
    if (part2.indexOf(char) >= 0 && part3.indexOf(char) >= 0) {
      found = true;
      // console.log(char, getPrio(char));
      sum2 += getPrio(char);
    }
  });
}

console.log(sum, sum2);
