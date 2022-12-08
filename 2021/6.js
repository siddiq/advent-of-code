const FILE = "6.txt";
const fs = require("fs");
const input = fs.readFileSync(FILE, "utf-8");

let arr = input.match(/\d+/g).map((n) => Number(n));

function step(radix) {
  const left = radix.shift();
  radix.push(left);
  radix[6] += left;
}
function solve(arr, days) {
  const radix = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  arr.forEach((item) => radix[item]++);
  for (let day = 0; day < days; day++) {
    step(radix);
  }
  return radix.reduce((a, c) => a + c, 0);
}

const growSchool = (data = [], days = 0) => {
  const fish = Array(9)
    .fill()
    .map((_, idx) => data.filter((t) => t === idx).length);

  Array(days)
    .fill()
    .forEach((_, idx) => {
      const newFish = fish.shift();
      fish.push(newFish);
      fish[6] += newFish;
    });

  return fish.reduce((a, b) => a + b, 0);
};

const days = 256;
console.log(solve([...arr], days));
console.log(growSchool([...arr], days));

// 26984457539, my sol and internet sol are same, but its too low

/*

012345678
.1121.... <- init
1121.....
121...1.1
21...1111
1...11312
...113221

3,4,3,1,2 <- init
2,3,2,0,1
1,2,1,6,0,8
0,1,0,5,6,7,8
6,0,6,4,5,6,7,8,8
5,6,5,3,4,5,6,7,7,8

*/
