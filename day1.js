const fs = require("fs");

let input = fs.readFileSync("day1.txt").toString("UTF8").split("\n");

let part1 = (data) => {
  let count = 0;
  let last = parseInt(data[0]);
  data.shift();

  data.forEach((n) => {
    let current = parseInt(n);
    if (current > last) {
      count++;
    }
    last = current;
  });

  return count;
};

let part2 = (data) => {
  let count = 0;
  let last = parseInt(data[0]) + parseInt(data[1]) + parseInt(data[2]);
  data.shift();

  for (let i = 0; i < data.length - 3; i++) {
    let current =
      parseInt(data[i]) + parseInt(data[i + 1]) + parseInt(data[i + 2]);
    if (current > last) {
      count++;
    }
    last = current;
  }

  return count;
};

console.log(`part1: ${part1(input)}`);
console.log(`part1: ${part2(input)}`);
