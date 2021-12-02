const { readFileSync } = require("fs");

let input = readFileSync("../../data/day1.txt")
  .toString("utf8")
  .split("\n")
  .map((n) => parseInt(n));

let d1part1 = (data: number[]) => {
  let count = 0;
  let last = data[0];
  data.shift();

  data.forEach((n) => {
    let current = n;
    if (current > last) {
      count++;
    }
    last = current;
  });

  return count;
};

let d1part2 = (data: number[]) => {
  let count = 0;
  let last = data[0] + data[1] + data[2];
  data.shift();

  for (let i = 0; i < data.length - 3; i++) {
    let current = data[i] + data[i + 1] + data[i + 2];
    if (current > last) {
      count++;
    }
    last = current;
  }

  return count;
};

console.log(`part1: ${d1part1(input)}`);
console.log(`part2: ${d1part2(input)}`);
