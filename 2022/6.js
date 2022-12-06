const solve = (input, count) => {
  for (let i = 0; i < input.length; i++) {
    const map = {};
    for (let j = i; j < i + count; j++) {
      map[input[j]] = true;
    }
    if (Object.keys(map).length === count) {
      return i + count;
    }
  }
};

const input = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";

console.log(solve(input, 4));
console.log(solve(input, 14));
