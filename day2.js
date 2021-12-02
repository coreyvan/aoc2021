const fs = require("fs");

let processData = (filename) => {
  let input = fs.readFileSync(filename).toString("UTF8").split("\n");

  return input.map((elem) => {
    let com = elem.split(" ");
    return { direction: com[0], value: parseInt(com[1]) };
  });
};

let part1 = (commands) => {
  let depth = 0;
  let distance = 0;

  commands.forEach((command) => {
    switch (command.direction) {
      case "forward":
        distance += command.value;
        break;
      case "down":
        depth += command.value;
        break;
      case "up":
        depth -= command.value;
        if (depth < 0) depth = 0;
        break;
    }
  });
  return depth * distance;
};

let part2 = (commands) => {
  let depth = 0;
  let distance = 0;
  let aim = 0;

  commands.forEach((command) => {
    switch (command.direction) {
      case "forward":
        distance += command.value;
        depth += aim * command.value;
        break;
      case "down":
        aim += command.value;
        break;
      case "up":
        aim -= command.value;
        break;
    }
  });
  return depth * distance;
};

console.log(part1(processData("data/day2.txt")));
console.log(part2(processData("data/day2.txt")));
