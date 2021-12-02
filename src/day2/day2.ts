import fs = require("fs");

type command = {
  direction: string;
  value: number;
};

let processData = (
  filename: string,
  callback: (err: any, data: command[]) => void
) => {
  fs.readFile(filename, (err: any, bytes: Buffer) => {
    if (err) callback(err, null);
    let data: command[] = bytes
      .toString()
      .split("\n")
      .map((elem) => {
        let com = elem.split(" ");
        return { direction: com[0], value: parseInt(com[1]) };
      });
    callback(null, data);
  });
};

let part1 = (err: any, commands: command[]) => {
  if (err) {
    console.log(err);
    return;
  }
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
  console.log(depth * distance);
};

let part2 = (err: any, commands: command[]) => {
  if (err) {
    console.log(err);
    return;
  }

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
  console.log(depth * distance);
};

processData("../../data/day2.txt", part1);
processData("../../data/day2.txt", part2);
