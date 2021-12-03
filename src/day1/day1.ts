import { readFileSync } from "fs";

let input = readFileSync("../../data/day1.txt")
  .toString("utf8")
  .split("\n")
  .map((n) => parseInt(n));

function part1(data: number[]) {
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
}

function part2(data: number[]) {
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
}

console.assert(part1(input) == 1832, "part1 was incorrect, should equal 1832");
console.assert(part2(input) == 1857, "part2 was incorrect, should equal 1857");

export {};
