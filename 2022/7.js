const FILE = "7a.txt";
const fs = require("fs");
const input = fs.readFileSync(FILE, "utf-8");
const lines = input.trim().split("\n");

const root = {
  size: 0,
};
let cwd = root;
function goUp(dir) {
  dir.parent.size += dir.size;
  const prev = dir;
  dir = dir.parent;
  delete prev.parent;
  return dir;
}
lines.forEach((line) => {
  if (/^\$ cd/i.test(line)) {
    const [temp0, temp1, dir] = line.split(" ").map((str) => str.trim());
    if (dir === "..") {
      cwd = goUp(cwd);
    } else if (dir === "/") {
      cwd = root;
    } else {
      cwd = cwd[dir];
    }
  } else if (line === "$ ls") {
    // hmmm
  } else if (line[0] !== "$") {
    const [a, b] = line.split(" ");
    if (a === "dir") {
      cwd[b] = {
        parent: cwd,
        type: "dir",
        size: 0,
      };
    } else {
      cwd[b] = {
        type: "file",
        size: Number(a),
      };
      cwd.size += Number(a);
    }
  }
});
while (cwd !== root) {
  cwd = goUp(cwd);
}

function scan(dir) {
  Object.entries(dir).forEach(([k, v]) => {
    if (v.type === "dir") {
      if (v.size <= 100000) {
        sum += v.size;
      }
      scan(v);
    }
  });
}

let sum = 0;
scan(root);
console.log(sum);

// Part 2
let best = null;
function scan2(dir) {
  Object.entries(dir).forEach(([k, v]) => {
    if (v.type === "dir") {
      if (freeSpace + v.size >= required) {
        best = best === null ? v.size : Math.min(best, v.size);
      }
      scan2(v);
    }
  });
}

const volume = 70000000;
const required = 30000000;
const freeSpace = volume - root.size;
scan2(root);
console.log(best);
