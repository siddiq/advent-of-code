const FILE = "5.txt";
const fs = require("fs");
const input = fs.readFileSync(FILE, "utf-8");
const lines = input.split("\n");

const containers = [[], [], [], [], [], [], [], [], [], [], []];
let firstEmpty = lines.indexOf("");
let numContainers = Number(lines[firstEmpty - 1].trim().split(" ").pop());
console.log("numContainers", numContainers);
for (let i = 0; i < firstEmpty - 1; i++) {
  const line = lines[i];
  for (let c = 0; c < numContainers; c++) {
    const con = line.substring(c * 4 + 1, c * 4 + 2).trim();
    containers[c + 1] = containers[c + 1] || [];
    if (con !== "") {
      containers[c + 1].unshift(con);
    }
  }
}

function move(howMany, source, dest) {
  for (let i = 0; i < howMany; i++) {
    const temp = containers[source].pop();
    containers[dest].push(temp);
  }
}

function move2(howMany, source, dest) {
  const temp = [];
  for (let i = 0; i < howMany; i++) {
    temp.push(containers[source].pop());
  }
  for (let i = 0; i < howMany; i++) {
    containers[dest].push(temp.pop());
  }
}

console.log(containers);
// moves
for (let i = firstEmpty + 1; i < lines.length; i++) {
  const line = lines[i];
  if (line.trim() === "") {
    break;
  }
  const [howMany, source, dest] = line.match(/\d+/g);
  console.log(`"${line}"`);

  // move(howMany, source, dest); // part 1
  move2(howMany, source, dest); // part 2
}

const answer = containers
  .map((container) => container.pop())
  .join("")
  .trim();

console.log(containers);
console.log(answer);
