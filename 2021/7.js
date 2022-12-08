const FILE = "7.txt";
const fs = require("fs");
const input = fs.readFileSync(FILE, "utf-8");

// const input = "16,1,2,0,4,2,7,1,2,14";
const arr = input
  .trim()
  .split(",")
  .map((n) => Number(n));

const getFuelCost = (arr) => {
  let idealFuel = null;
  for (let i = 0; i < arr.length; i++) {
    const target = arr[i];
    const fuel = arr.reduce((a, c) => a + Math.abs(c - target), 0);
    idealFuel = idealFuel === null ? fuel : Math.min(idealFuel, fuel);
  }
  return idealFuel;
};

const getFuelCost2 = (arr) => {
  const min = arr.reduce((a, c) => Math.min(a, c), arr[0]);
  const max = arr.reduce((a, c) => Math.max(a, c), arr[0]);
  let idealFuel = null;
  for (let i = min; i <= max; i++) {
    const target = i;
    const fuel = arr.reduce((a, c) => {
      const diff = Math.abs(c - target);
      const expDiff = (diff * (diff + 1)) / 2;
      return a + expDiff;
    }, 0);
    idealFuel = idealFuel === null ? fuel : Math.min(idealFuel, fuel);
  }
  return idealFuel;
};

console.log(getFuelCost([...arr]));
console.log(getFuelCost2([...arr]));

/*
1 -> 5 :
4 steps
1+2+3+4 = 10

1           1
2 1+2       3
3 1+2+3     6
4 1+2+3+4   10
5 1+2+3+4+5 15

(1+5)/2 * 5 = 15?
3 * 5

(1+n)/2*2

*/
