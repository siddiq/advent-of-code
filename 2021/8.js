const FILE = "8a.txt";
const fs = require("fs");
const input = fs.readFileSync(FILE, "utf-8");

// acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf

const lines = input.trim().split("\n");
let count = 0;
lines.forEach((line) => {
  const [left, right] = line.split("|").map((str) => str.trim());
  const signals = right.split(" ");
  signals.forEach((sig) => {
    if (sig.length === 2) {
      count++;
    }
    if (sig.length === 4) {
      count++;
    }
    if (sig.length === 3) {
      count++;
    }
    if (sig.length === 7) {
      count++;
    }
  });
});
console.log(count);

const overlap = (a, b) => {
  const arr1 = a.split("");
  const arr2 = b.split("");
  const arr3 = arr1.filter((item) => arr2.indexOf(item) >= 0);
  return arr3.length;
};

// part 2
let sum = 0;
lines.forEach((line) => {
  const [left, right] = line.split("|").map((str) => str.trim());
  const signals = left.split(" ");
  const map = {
    1: signals.find((item) => item.length === 2),
    4: signals.find((item) => item.length === 4),
    7: signals.find((item) => item.length === 3),
    8: signals.find((item) => item.length === 7),
  };
  // 3 len=5 done
  map[3] = signals.find(
    (item) =>
      item.length === 5 &&
      item.indexOf(map[1][0]) >= 0 &&
      item.indexOf(map[1][1]) >= 0
  );
  // 9 len=6 from 3?
  map[9] = signals.find(
    (item) => item.length === 6 && overlap(item, map[3]) === 5
  );
  // 2 len=5,
  map[2] = signals.find(
    (item) => item.length === 5 && overlap(item, map[9]) === 4
  );
  // 5 len=5, it is not 3 &&
  map[5] = signals.find(
    (item) => item.length === 5 && overlap(item, map[9]) === 5
  );

  // 6 len=6
  map[6] = signals.find(
    (item) => item.length === 6 && overlap(item, map[2]) === 4
  );

  // 0 len=6
  map[0] = signals.find(
    (item) => item.length === 6 && item !== map[9] && item !== map[6]
  );

  const reverse = {};
  Object.keys(map).map((k) => (reverse[map[k].split("").sort().join("")] = k));

  // console.log(map);
  // console.log(reverse);
  // console.log(right);

  const number = right
    .split(" ")
    .map((num) => num.split("").sort().join(""))
    .join(" ");

  // console.log(number);

  const decoded = number
    .split(" ")
    .map((num) => reverse[num])
    .join("");
  console.log("decoded", decoded);
  sum += Number(decoded);
});
console.log(sum);
