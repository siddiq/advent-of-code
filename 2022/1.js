const FILE = "1.txt";
const input =
  typeof document === "undefined"
    ? require("fs").readFileSync(FILE, "utf-8")
    : document.body.innerText;
const lines = input.split("\n");

let elves = [];
while (lines.length > 0) {
  let elve = 0;
  while (lines[0] !== "") {
    elve += Number(lines[0]);
    lines.shift();
  }
  elves.push(elve);
  lines.shift();
}
elves.sort((a, b) => b - a);
console.log(elves[0]);
console.log(elves[0] + elves[1] + elves[2]);
